import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import isHotkey from 'is-hotkey'
import {
    ReactEditor, Editable, withReact, useSlate, Slate,
    useSlateStatic, useSelected, useFocused
} from 'slate-react'
import {
    Editor,
    Transforms,
    createEditor,
    Element as SlateElement,
} from 'slate'
import { withHistory } from 'slate-history'
import { css } from '@emotion/css'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import CardMedia from '@mui/material/CardMedia'
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import CodeIcon from '@mui/icons-material/Code';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ImageIcon from '@mui/icons-material/Image'
import DeleteIcon from '@mui/icons-material/Delete'

import { Button, Toolbar } from './Component'

import { deserialize, isImageUrl } from '../../../utils'

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

const initialValue = [
    {
        type: 'paragraph',
        children: [
            { text: 'This is editable ' },
            { text: 'rich', bold: true },
            { text: ' text, ' },
            { text: 'much', italic: true },
            { text: ' better than a ' },
            { text: '<textarea>', code: true },
            { text: '!' },
        ],
    },
]

const SlateEditor = (props) => {
    const timeoutRef = useRef(null)

    const [value, setValue] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [editor] = useState(() => withHtml(withImages(withReact(withHistory(createEditor())))))

    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])

    useEffect(() => {
        setIsLoading(true)
    }, [])

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
        setIsLoading(false)

    }, [props.initialValue, props.isEdit])

    useEffect(() => {
        if (!!value) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            timeoutRef.current = setTimeout(() => {
                if (props.onChange) {
                    props.onChange(JSON.stringify(value))
                }
            }, 500);
        }
    }, [value, props])

    const handleChange = (value) => {
        // console.log('[handleChange]', value)
        setValue(value)
    }

    // console.log('[value]', value)

    if (!!isLoading || (!isLoading && (!value || value.length <= 0))) {
        return (
            <div >
                <CircularProgress size={100} />
            </div>
        )
    }

    return (
        <Slate editor={editor} value={value} onChange={value => handleChange(value)}>
            <Toolbar>
                <MarkButton format="bold" icon="format_bold" Icon={() => <FormatBoldIcon />} />
                <MarkButton format="italic" icon="format_italic" Icon={() => <FormatItalicIcon />} />
                <MarkButton format="underline" icon="format_underlined" Icon={() => <FormatUnderlinedIcon />} />
                <MarkButton format="code" icon="code" Icon={() => <CodeIcon />} />
                <BlockButton format="heading-one" icon="looks_one" Icon={() => <LooksOneIcon />} />
                <BlockButton format="heading-two" icon="looks_two" Icon={() => <LooksTwoIcon />} />
                <BlockButton format="block-quote" icon="format_quote" Icon={() => <FormatQuoteIcon />} />
                <BlockButton format="numbered-list" icon="format_list_numbered" Icon={() => <FormatListNumberedIcon />} />
                <BlockButton format="bulleted-list" icon="format_list_bulleted" Icon={() => <FormatListBulletedIcon />} />
                <BlockButton format="left" icon="format_align_left" Icon={() => <FormatAlignLeftIcon />} />
                <BlockButton format="center" icon="format_align_center" Icon={() => <FormatAlignCenterIcon />} />
                <BlockButton format="right" icon="format_align_right" Icon={() => <FormatAlignRightIcon />} />
                <BlockButton format="justify" icon="format_align_justify" Icon={() => <FormatAlignJustifyIcon />} />
                <InsertImageButton format="image" icon="insert_image" Icon={() => <ImageIcon />} />
            </Toolbar>
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Enter some rich text…"
                spellCheck
                // autoFocus={autoFocus || false}
                onKeyDown={event => {
                    for (const hotkey in HOTKEYS) {
                        if (isHotkey(hotkey, event)) {
                            event.preventDefault()
                            const mark = HOTKEYS[hotkey]
                            toggleMark(editor, mark)
                        }
                    }
                }}
                style={{ padding: '0 20px', }}
            />
        </Slate>
    )
}

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
    )
    const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            LIST_TYPES.includes(n.type) &&
            !TEXT_ALIGN_TYPES.includes(format),
        split: true,
    })
    let newProperties
    if (TEXT_ALIGN_TYPES.includes(format)) {
        newProperties = {
            align: isActive ? undefined : format,
        }
    } else {
        newProperties = {
            type: isActive ? 'paragraph' : isList ? 'list-item' : format,
        }
    }
    Transforms.setNodes(editor, newProperties)

    if (!isActive && isList) {
        const block = { type: format, children: [] }
        Transforms.wrapNodes(editor, block)
    }
}

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

const insertImage = (editor, url) => {
    // console.log('[insertImage]', editor, url)
    const text = { text: '' }
    const image = { type: 'image', url, children: [text] }
    Transforms.insertNodes(editor, image)
}

const withImages = editor => {
    const { insertData, isVoid } = editor

    editor.isVoid = element => {
        return element.type === 'image' ? true : isVoid(element)
    }

    editor.insertData = data => {
        const text = data.getData('text/plain')
        const { files } = data

        if (files && files.length > 0) {
            for (const file of files) {
                const reader = new FileReader()
                const [mime] = file.type.split('/')

                if (mime === 'image') {
                    reader.addEventListener('load', () => {
                        const url = reader.result
                        insertImage(editor, url)
                    })

                    reader.readAsDataURL(file)
                }
            }
        } else if (isImageUrl(text)) {
            insertImage(editor, text)
        } else {
            insertData(data)
        }
    }

    return editor
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

const isBlockActive = (editor, format, blockType = 'type') => {
    try {
        const { selection } = editor
        if (!selection) return false

        const [match] = Array.from(
            Editor.nodes(editor, {
                at: Editor.unhangRange(editor, selection),
                match: n =>
                    !Editor.isEditor(n) &&
                    SlateElement.isElement(n) &&
                    n[blockType] === format,
            })
        )

        return !!match
    } catch (error) {
        console.error('[error-isMarkActive', error)
    }
}

const isMarkActive = (editor, format) => {
    try {
        const marks = Editor.marks(editor)
        return marks ? marks[format] === true : false
    } catch (error) {
        console.error('[error-isMarkActive', error)
    }
}

const Element = ({ attributes, children, element }) => {
    const style = { textAlign: element.align }
    // console.log('[render-element]', element)
    switch (element.type) {
        case 'block-quote':
            return (
                <blockquote style={style} {...attributes}>
                    {children}
                </blockquote>
            )
        case 'bulleted-list':
            return (
                <ul style={style} {...attributes}>
                    {children}
                </ul>
            )
        case 'heading-one':
            return (
                <h1 style={style} {...attributes}>
                    {children}
                </h1>
            )
        case 'heading-two':
            return (
                <h2 style={style} {...attributes}>
                    {children}
                </h2>
            )
        case 'list-item':
            return (
                <li style={style} {...attributes}>
                    {children}
                </li>
            )
        case 'numbered-list':
            return (
                <ol style={style} {...attributes}>
                    {children}
                </ol>
            )
        case 'image':
            return (
                <Image attributes={attributes} element={element}>
                    {children}
                </Image>
            )
        default:
            return (
                <p style={style} {...attributes}>
                    {children}
                </p>
            )
    }
}

const Leaf = ({ attributes, children, leaf }) => {
    // console.log('[render-leaf]', leaf)
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

    return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, icon, Icon }) => {
    const editor = useSlate()
    return (
        <Button
            active={isBlockActive(
                editor,
                format,
                TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
            )}
            onMouseDown={event => {
                event.preventDefault()
                toggleBlock(editor, format)
            }}
        >
            <Icon />
        </Button>
    )
}

const MarkButton = ({ format, icon, Icon }) => {
    const editor = useSlate()
    return (
        <Button
            active={isMarkActive(editor, format) || false}
            onMouseDown={event => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
        >
            <Icon />
        </Button>
    )
}

const Image = ({ attributes, children, element }) => {
    const editor = useSlateStatic()
    const path = ReactEditor.findPath(editor, element)

    const selected = useSelected()
    const focused = useFocused()
    return (
        <div {...attributes}>
            {children}
            <div
                contentEditable={false}
                className={css`position: relative;  `}
            >
                <Box sx={{
                    display: 'flex', flexDirection: 'column',
                    height: '90vh',
                    marginY: 2,
                }}>
                    <CardMedia
                        component='img'
                        image={element.url}
                        alt='image'
                        className={css`
                            object-fit: contain;
                            max-width: 100%;
                            height: 100%;
                            box-shadow: ${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'};
                        `}
                    />
                </Box>
                <Button
                    active
                    onClick={() => Transforms.removeNodes(editor, { at: path })}
                    className={css`
                        display: ${selected && focused ? 'inline' : 'none'};
                        position: absolute;
                        top: 0.5em;
                        left: 0.5em;
                        background-color: white;
                        `}
                >
                    <DeleteIcon />
                </Button>
            </div>
        </div>
    )
}

const InsertImageButton = ({ Icon }) => {
    const editor = useSlateStatic()
    return (
        <Button
            onMouseDown={event => {
                event.preventDefault()
                const url = window.prompt('Enter the URL of the image:')
                if (!url) return
                if (url && !isImageUrl(url)) {
                    alert('URL is not an image')
                    return
                }
                insertImage(editor, url)
            }}
        >
            <Icon />
        </Button>
    )
}

export default memo(SlateEditor)
