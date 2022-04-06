import { useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { jsx } from 'slate-hyperscript'

/**
 * custom hooks
 * @url https://reactjs.org/docs/hooks-custom.html
 */
export const useTitle = (title = 'Valley') => {
    useEffect(() => {
        document.title = title;
    }, [title]);
};

export const useToggle = (initial = false) => {
    const [toggle, setValue] = useState(initial)
    const setToggle = useCallback(() => setValue(v => !v), [])
    return { toggle, setToggle }
}

export const useHover = (initial = false) => {
    const [hover, setHover] = useState(initial)
    const onMouseEnter = useCallback(() => setHover(true), [])
    const onMouseLeave = useCallback(() => setHover(false), [])
    return [hover, { onMouseEnter, onMouseLeave }]
}

export const useIndex = (initial = null) => {
    const [index, setIndex] = useState(initial)
    const onMouseEnter = useCallback((data, index) => setIndex(index), [])
    const onMouseLeave = useCallback(() => setIndex(null), [])
    return [index, { onMouseEnter, onMouseLeave }]
}

export const useInput = (initial = '') => {
    const [value, setValue] = useState(initial)
    const onChange = useCallback(e => setValue(e.target.value), [])
    return [value, onChange]
}

export const useTarget = (initial = null) => {
    const [value, setValue] = useState(initial)
    const setTarget = useCallback(e => setValue(e.currentTarget), [])
    const freeTarget = useCallback(() => setValue(null), [])
    return [value, { setTarget, freeTarget }]
}

export const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}


/**
 * helper functions
 * @url https://github.com/30-seconds/30-seconds-of-code
 */
export const countBy = (arr, fn) =>
    (fn ? arr.map(typeof fn === 'function' ? fn : val => val[fn]) : arr).reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1
        return acc
    }, {})

export const sortBy = (arr, compare) =>
    arr.map((item, index) => ({ item, index }))
        .sort((a, b) => compare(a.item, b.item) || a.index - b.index)
        .map(({ item }) => item)

export const renameKeys = (keysMap, obj) =>
    Object.keys(obj).reduce(
        (acc, key) => ({
            ...acc,
            ...{ [keysMap[key] || key]: obj[key] }
        }),
        {}
    )

const ELEMENT_TAGS = {
    A: el => ({ type: 'link', url: el.getAttribute('href') }),
    BLOCKQUOTE: () => ({ type: 'quote' }),
    H1: () => ({ type: 'heading-one' }),
    H2: () => ({ type: 'heading-two' }),
    H3: () => ({ type: 'heading-three' }),
    H4: () => ({ type: 'heading-four' }),
    H5: () => ({ type: 'heading-five' }),
    H6: () => ({ type: 'heading-six' }),
    IMG: el => ({ type: 'image', url: el.getAttribute('src') }),
    LI: () => ({ type: 'list-item' }),
    OL: () => ({ type: 'numbered-list' }),
    P: () => ({ type: 'paragraph' }),
    PRE: () => ({ type: 'code' }),
    UL: () => ({ type: 'bulleted-list' }),
}
const TEXT_TAGS = {
    CODE: () => ({ code: true }),
    DEL: () => ({ strikethrough: true }),
    EM: () => ({ italic: true }),
    I: () => ({ italic: true }),
    S: () => ({ strikethrough: true }),
    STRONG: () => ({ bold: true }),
    U: () => ({ underline: true }),
}
export const deserialize = el => {
    if (el.nodeType === 3) {
        return el.textContent
    } else if (el.nodeType !== 1) {
        return null
    } else if (el.nodeName === 'BR') {
        return '\n'
    }

    const { nodeName } = el
    let parent = el

    if (
        nodeName === 'PRE' &&
        el.childNodes[0] &&
        el.childNodes[0].nodeName === 'CODE'
    ) {
        parent = el.childNodes[0]
    }
    let children = Array.from(parent.childNodes)
        .map(deserialize)
        .flat()

    if (children.length === 0) {
        children = [{ text: '' }]
    }

    if (el.nodeName === 'BODY') {
        return jsx('fragment', {}, children)
    }

    if (ELEMENT_TAGS[nodeName]) {
        const attrs = ELEMENT_TAGS[nodeName](el)
        return jsx('element', attrs, children)
    }

    if (TEXT_TAGS[nodeName]) {
        const attrs = TEXT_TAGS[nodeName](el)
        return children.map(child => jsx('text', attrs, child))
    }

    return children
}
