import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { jsx } from 'slate-hyperscript'
import { Transforms, createEditor, Descendant } from 'slate'
import { withHistory } from 'slate-history'
import {
    Slate,
    Editable,
    withReact,
    useSelected,
    useFocused,
} from 'slate-react'

import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { css } from '@emotion/css'

import { initialValueSmall as initialValue } from '../../../constants/dataEditor'
import { Box } from '@mui/system';

const ELEMENT_TAGS = {
    A: el => ({ type: 'link', url: el.getAttribute('href') }),
    BLOCKQUOTE: () => ({ type: 'block-quote' }),
    H1: () => ({ type: 'heading-one' }),
    H2: () => ({ type: 'heading-two' }),
    H3: () => ({ type: 'heading-three' }),
    H4: () => ({ type: 'heading-four' }),
    H5: () => ({ type: 'heading-five' }),
    H6: () => ({ type: 'heading-six' }),
    IMG: el => ({ type: 'image', url: el.getAttribute('src') }),
    IMGC: el => ({ type: 'image-customize', url: el.getAttribute('src') }),
    LI: () => ({ type: 'list-item' }),
    OL: () => ({ type: 'numbered-list' }),
    P: () => ({ type: 'paragraph' }),
    PRE: () => ({ type: 'code' }),
    UL: () => ({ type: 'bulleted-list' }),
}

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
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

const PasteHtmlComponent = (props) => {

    const [value, setValue] = useState(initialValue)

    const [state, setState] = useState({
        readOnly: false,
        alt: 'artsunday.vn'
    })

    const renderElement = useCallback(props => <Element {...props} alt={state.alt} />, [state.alt])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editor = useMemo(
        () => withHtml(withReact(withHistory(createEditor()))),
        []
    )

    useEffect(() => {
        setState(prev => { return { ...prev, readOnly: props.readOnly } })
    }, [props.readOnly])

    useEffect(() => {
        setState(prev => { return { ...prev, alt: props.alt } })
    }, [props.alt])

    useEffect(() => {
        setValue(null)
        if (!!props.initialValue && props.initialValue.length > 0) {
            const timeoutRef = setTimeout(() => {
                setValue(props.initialValue)
            }, 1000);
            return () => {
                clearTimeout(timeoutRef)
            }
        } else {
            setValue(initialValue)
        }
    }, [props.initialValue])

    const handleChange = (value) => {
        // console.log('[handleChange]', value)
        setValue(value)
    }

    if (!value || value.length <= 0) return null

    return (
        <Slate editor={editor} value={value} onChange={value => handleChange(value)}>
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Paste in some HTML..."
                readOnly={state.readOnly}
            />
        </Slate>
    )
}

const withHtml = editor => {
    const { insertData, isInline, isVoid } = editor

    editor.isInline = element => {
        return element.type === 'link' ? true : isInline(element)
    }

    editor.isVoid = element => {
        return element.type === 'image' ? true : isVoid(element)
    }

    editor.insertData = data => {
        const html = data.getData('text/html')

        if (html) {
            const parsed = new DOMParser().parseFromString(html, 'text/html')
            const fragment = deserialize(parsed.body)
            Transforms.insertFragment(editor, fragment)
            return
        }

        insertData(data)
    }

    return editor
}

const Element = props => {
    const { attributes, children, element } = props

    switch (element.type) {
        default:
            return <p {...attributes}>{children}</p>
        case 'block-quote':
            return <blockquote {...attributes}>{children}</blockquote>
        case 'code':
            return (
                <pre>
                    <code {...attributes}>{children}</code>
                </pre>
            )
        case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>
        case 'heading-one':
            return <h1 {...attributes}>{children}</h1>
        case 'heading-two':
            return <h2 {...attributes}>{children}</h2>
        case 'heading-three':
            return <h3 {...attributes}>{children}</h3>
        case 'heading-four':
            return <h4 {...attributes}>{children}</h4>
        case 'heading-five':
            return <h5 {...attributes}>{children}</h5>
        case 'heading-six':
            return <h6 {...attributes}>{children}</h6>
        case 'list-item':
            return <li {...attributes}>{children}</li>
        case 'numbered-list':
            return <ol {...attributes}>{children}</ol>
        case 'link':
            return (
                <a href={element.url} {...attributes} target='_blank' className={css`
                color: #1976D2;
                text-decoration: none;
                background-color: transparent;
              `} >
                    {children}
                </a>
            )
        case 'image':
            return <ImageElement {...props} />
        case 'image-customize':
            return (
                <ImageCustomizeElement {...props} />
            )
        case 'video':
            return (
                <VideoElement attributes={attributes} element={element}>
                    {children}
                </VideoElement>
            )
    }
}

const ImageElement = ({ attributes, children, element, alt }) => {
    console.log('[element.url]', element, alt)
    return (
        <div {...attributes}>
            {children}
            <Box sx={{
                display: 'flex', flexDirection: 'column',
                // maxheight: '90vh',
                marginY: 2,
            }}>
                <CardMedia
                    component='img'
                    image={element.url}
                    alt={alt}
                    className={css`
                            object-fit: contain;
                            max-width: 100%;
                            max-height: 90vh;
                            height: 100%;
                        `}
                />
            </Box>
        </div>
    )
}

const ImageCustomizeElement = ({ attributes, children, element, alt }) => {
    const maxWidth = element.typeImage == 'full' ? '100%' : '50%'

    return (
        <div {...attributes}>
            <Box sx={{
                display: 'flex', flexDirection: 'row',
                marginY: 2,
            }}
            >
                {element.typeImage == 'half-right' &&
                    <CardContent sx={{ flex: 1 }}>
                        <Typography variant="title2" color="text.secondary">
                            {children}
                        </Typography>
                    </CardContent>
                }
                {element.typeImage == 'full' && <div className={css`display: 'none';`}>{children}</div>}

                <CardMedia
                    component='img'
                    image={element.url}
                    alt={alt}
                    className={css`
                            object-fit: contain;
                            max-width: ${maxWidth};
                            max-height: 90vh;
                            height: 100%;
                        `}
                />
                {element.typeImage == 'half-left' &&
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {children}
                        </Typography>
                    </CardContent>
                }
            </Box>
        </div>
    )
}

const VideoElement = ({ attributes, children, element }) => {
    const { url } = element
    return (
        <div {...attributes}>
            <div className={css`display: 'none';`}> {children} </div>
            <div contentEditable={false}
                className={css`position: relative; height: 80vh`}
            >
                <Box sx={{
                    display: 'flex', flexDirection: 'row',
                    marginY: 2,
                }}
                >
                    <iframe
                        src={`${url}`}
                        frameBorder="0"
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </Box>
            </div>
        </div>
    )
}

const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.code) {
        children = <code>{children}</code>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underline) {
        children = <u>{children}</u>
    }

    if (leaf.strikethrough) {
        children = <del>{children}</del>
    }

    return <span {...attributes}>{children}</span>
}

export default PasteHtmlComponent