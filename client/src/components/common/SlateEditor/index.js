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
    Text,
    Range,
    Element as SlateElement,
} from 'slate'

import { withHistory } from 'slate-history'
import { css } from '@emotion/css'
import isUrl from 'is-url'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ButtonLib from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AppBar from '@mui/material/AppBar'
import Toolbar2 from '@mui/material/Toolbar'

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import CodeIcon from '@mui/icons-material/Code';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import LooksThreeIcon from '@mui/icons-material/Looks3';
import LooksFourIcon from '@mui/icons-material/Looks4';
import LooksFiveIcon from '@mui/icons-material/Looks5';
import LooksSixIcon from '@mui/icons-material/Looks6';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ImageIcon from '@mui/icons-material/Image'
import BurstModeIcon from '@mui/icons-material/BurstMode';
import YouTubeIcon from '@mui/icons-material/YouTube'
import DeleteIcon from '@mui/icons-material/Delete'
import AddLinkIcon from '@mui/icons-material/AddLink';
import RemoveLinkIcon from '@mui/icons-material/LinkOff';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';

import { Button, Toolbar, Menu, Portal } from './Component'

import { deserialize, isImageUrl, removeAccents } from '../../../utils'
import { initialValueSmall as initialValue } from '../../../constants/dataEditor'

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

const SlateEditor = (props) => {
    const timeoutRef = useRef(null)

    const [value, setValue] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [dialog, setDialog] = useState({
        open: false,
        type: 1
    })
    const [search, setSearch] = useState('')

    const [editor] = useState(() => withHtml(withEmbeds(withImages(withReact(withHistory(createEditor()))))))

    const decorate = useCallback(
        ([node, path]) => {
            const ranges = []

            if (search && Text.isText(node)) {
                const { text } = node
                const parts = text.split(search)
                let offset = 0

                parts.forEach((part, i) => {
                    if (i !== 0) {
                        ranges.push({
                            anchor: { path, offset: offset - search.length },
                            focus: { path, offset },
                            highlight: true,
                        })
                    }

                    offset = offset + part.length + search.length
                })
            }

            return ranges
        },
        [search]
    )
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])

    const handleChange = (value) => {
        console.log('[handleChange]', value)
        setValue(value)
    }

    const handleDialog = (open, type) => {
        setDialog({ open, type })
    }

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

    console.log('[value]', value)

    if (!!isLoading || (!isLoading && (!value || value.length <= 0))) {
        return (
            <div >
                <CircularProgress size={100} />
            </div>
        )
    }

    return (
        <Slate editor={editor} value={value} onChange={value => handleChange(value)}>

            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                decorate={decorate}
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
                style={{ padding: '20px', }}
            />
            <AppBar position="relative" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar >
                    <MarkButton format="bold" icon="format_bold" Icon={() => <FormatBoldIcon />} />
                    <MarkButton format="italic" icon="format_italic" Icon={() => <FormatItalicIcon />} />
                    <MarkButton format="underline" icon="format_underlined" Icon={() => <FormatUnderlinedIcon />} />
                    <MarkButton format="code" icon="code" Icon={() => <CodeIcon />} />
                    {/* <BlockButton format="heading-one" icon="looks_one" Icon={() => <LooksOneIcon />} /> */}
                    <BlockButton format="heading-two" icon="looks_two" Icon={() => <LooksTwoIcon />} />
                    <BlockButton format="heading-three" icon="three" Icon={() => <LooksThreeIcon />} />
                    <BlockButton format="heading-four" icon="four" Icon={() => <LooksFourIcon />} />
                    <BlockButton format="heading-five" icon="five" Icon={() => <LooksFiveIcon />} />
                    <BlockButton format="heading-six" icon="six" Icon={() => <LooksSixIcon />} />
                    <BlockButton format="block-quote" icon="format_quote" Icon={() => <FormatQuoteIcon />} />
                    <BlockButton format="numbered-list" icon="format_list_numbered" Icon={() => <FormatListNumberedIcon />} />
                    <BlockButton format="bulleted-list" icon="format_list_bulleted" Icon={() => <FormatListBulletedIcon />} />
                    <BlockButton format="left" icon="format_align_left" Icon={() => <FormatAlignLeftIcon />} />
                    <BlockButton format="center" icon="format_align_center" Icon={() => <FormatAlignCenterIcon />} />
                    <BlockButton format="right" icon="format_align_right" Icon={() => <FormatAlignRightIcon />} />
                    <BlockButton format="justify" icon="format_align_justify" Icon={() => <FormatAlignJustifyIcon />} />
                    <InsertImageButton format="image" icon="insert_image" Icon={() => <ImageIcon />} />
                    <InsertImageCustomizeButton format="image-customize" icon="insert_image_customize" Icon={() => <BurstModeIcon />} onClickOpen={() => handleDialog(true, 1)} />
                    <InsertVideoButton format="video" icon="insert_video" Icon={() => <YouTubeIcon />} />
                    <AddLinkButton format="link" icon="insert_link" Icon={() => <AddLinkIcon />} />
                    <RemoveLinkButton format="link" icon="insert_link" Icon={() => <RemoveLinkIcon />} />

                    <div style={{ display: 'flex', flexDirection:'row', marginLeft: 0, padding: 4 }} >
                        <div style={{ marginLeft: '4px' }} >
                            <input
                                type="search"
                                placeholder="Search the text..."
                                onChange={e => setSearch(e.target.value)}
                                className={css`
                                        padding-left: 1.5em;
                                        height: 24px;
                                        width: 180px;
                                    `}
                            />
                        </div>
                        <div style={{ marginLeft: '10px' }} >
                            <InsertLinkButton format="link" icon="insert_link" Icon={() => <ReplayCircleFilledIcon />} onClickOpen={() => handleDialog(true, 2)} />
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <DialogComponent search={search} openDialog={dialog.open} typeDialog={dialog.type} setVisible={() => handleDialog(false, -1)} />
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

const toggleFormat = (editor, format) => {
    const isActive = isFormatActive(editor, format)
    Transforms.setNodes(
        editor,
        { [format]: isActive ? null : true },
        { match: Text.isText, split: true }
    )
}

const insertImage = (editor, url) => {
    // console.log('[insertImage]', editor, url)
    const text = { text: '' }
    const image = { type: 'image', url, children: [text] }
    Transforms.insertNodes(editor, image)
}

const insertImageCustomize = (editor, value, typeImage) => {
    console.log('[insertImage]', value)
    const children = [
        { text: !!value.title ? `${value.title}\n\n\n` : '', bold: true, code: true },
        { text: value.content || '', code: true }
    ]
    const image = {
        ...value,
        typeImage,
        type: 'image-customize', children: children
    }
    Transforms.insertNodes(editor, image)
}

const insertVideo = (editor, url) => {
    console.log('[insertVideo]', editor, url)
    const text = { text: '' }
    const video = { type: 'video', url, children: [text] }
    Transforms.insertNodes(editor, video)
}

const addLink = (editor, url, search) => {
    if (editor.selection) {
        wrapLink(editor, url, search)
    }
}

const insertLink = (editor, url, search) => {
    if (editor.selection) {
        wrapAndReplaceLink(editor, url, search)
    }
}

const unwrapLink = editor => {
    Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
}

const wrapAndReplaceLink = (editor, url, search) => {

    for (const [node, path] of Editor.nodes(editor, { at: [] })) {
        if (search && Text.isText(node)) {
            const { text } = node
            const parts = text.split(search)
            let offset = 0

            parts.forEach((part, i) => {
                if (i !== 0) {
                    Transforms.select(editor, {
                        anchor: { path, offset: offset - search.length },
                        focus: { path, offset },
                    })
                    if (isLinkActive(editor)) {
                        console.log('[unwrapLink]')
                        unwrapLink(editor)
                    }

                    const searchConvert = search.normalize('NFD')
                    const link = {
                        type: 'link',
                        url: url,
                        children: [{ text: search }],
                    }

                    Transforms.insertNodes(editor, link)
                }

                offset = offset + part.length + search.length
            })
        }
    }
}

const wrapLink = (editor, url) => {
    if (isLinkActive(editor)) {
        unwrapLink(editor)
    }

    const { selection } = editor
    const isCollapsed = selection && Range.isCollapsed(selection)
    const link = {
        type: 'link',
        url,
        children: isCollapsed ? [{ text: url }] : [],
    }

    if (isCollapsed) {
        Transforms.insertNodes(editor, link)
    } else {
        Transforms.wrapNodes(editor, link, { split: true })
        Transforms.collapse(editor, { edge: 'end' })
    }
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

const withEmbeds = editor => {
    const { isVoid } = editor
    editor.isVoid = element => (element.type === 'video' ? true : isVoid(element))
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

const isFormatActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: n => n[format] === true,
        mode: 'all',
    })
    return !!match
}

const isLinkActive = editor => {
    const [link] = Editor.nodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
    console.log('[isLinkActive]', link)
    return !!link
}

const Element = ({ attributes, children, element }) => {
    const style = { textAlign: element.align }

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
        case 'heading-three':
            return (
                <h3 style={style} {...attributes}>
                    {children}
                </h3>
            )
        case 'heading-four':
            return (
                <h4 style={style} {...attributes}>
                    {children}
                </h4>
            )
        case 'heading-five':
            return (
                <h5 style={style} {...attributes}>
                    {children}
                </h5>
            )
        case 'heading-six':
            return (
                <h6 style={style} {...attributes}>
                    {children}
                </h6>
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
        case 'image-customize':
            return (
                <ImageCustomize attributes={attributes} element={element}>
                    {children}
                </ImageCustomize>
            )
        case 'video':
            return (
                <VideoElement attributes={attributes} element={element}>
                    {children}
                </VideoElement>
            )
        case 'link':
            return (
                <LinkComponent attributes={attributes} element={element} >
                    {children}
                </LinkComponent>
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
    console.log('[render-leaf]', leaf)
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

    return (
        <span
            {...attributes}
            {...(leaf.highlight && { 'data-cy': 'search-highlighted' })}
            className={css`
                    font-weight: ${leaf.bold && 'bold'};
                    background-color: ${leaf.highlight && '#ffeeba'};
                `}
        >
            {children}
        </span>
    )
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

const InsertImageCustomizeButton = ({ Icon, onClickOpen }) => {
    return (
        <Button onClick={onClickOpen}  >
            <Icon />
        </Button>
    )
}

const InsertVideoButton = ({ Icon }) => {
    const editor = useSlateStatic()
    return (
        <Button
            onMouseDown={event => {
                event.preventDefault()
                const url = window.prompt('Enter the URL of the video:')
                if (!url) return
                insertVideo(editor, url)
            }}
        >
            <Icon />
        </Button>
    )
}

const InsertLinkButton = ({ Icon, onClickOpen }) => {
    return (
        <Button onClick={onClickOpen}  >
            <Icon />
        </Button>
    )
}

const AddLinkButton = ({ Icon }) => {
    const editor = useSlate()
    return (
        <Button
            active={isLinkActive(editor)}
            onMouseDown={event => {
                event.preventDefault()
                const url = window.prompt('Enter the URL of the link:')
                if (!url) return
                addLink(editor, url)
            }}
        >
            <Icon />
        </Button>
    )
}

const RemoveLinkButton = ({ Icon }) => {
    const editor = useSlate()

    return (
        <Button
            active={isLinkActive(editor)}
            onMouseDown={event => {
                if (isLinkActive(editor)) {
                    unwrapLink(editor)
                }
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
                    // maxHeight: '90vh',
                    marginY: 2,
                }}>
                    <CardMedia
                        component='img'
                        image={element.url}
                        alt='image'
                        className={css`
                            object-fit: contain;
                            max-width: 100%;
                            max-height: 90vh;
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

const ImageCustomize = ({ attributes, children, element }) => {
    const editor = useSlateStatic()
    const path = ReactEditor.findPath(editor, element)

    const maxWidth = element.typeImage == 'full' ? '100%' : '50%'

    const selected = true // useSelected()
    const focused = true // useFocused()

    return (
        <div {...attributes}>
            <div
                contentEditable={false}
                className={css`position: relative;  `}
            >
                <Box sx={{
                    display: 'flex', flexDirection: 'row',
                    marginY: 2,
                }}
                    className={css`box-shadow: ${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'};`}
                >
                    {element.typeImage == 'half-right' &&
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="title2" color="text.secondary">
                                {children}
                            </Typography>
                            <Button
                                active
                                onClick={() => Transforms.removeNodes(editor, { at: path })}
                                className={css`
                                    display: 'inline';
                                    position: absolute;
                                    top: 0.5em;
                                    right: 0.5em;
                                    background-color: white;
                                    `}
                            >
                                <DeleteIcon />
                            </Button>
                        </CardContent>
                    }
                    {element.typeImage == 'full' && <div className={css`display: 'none';`}>{children}</div>}
                    <CardMedia
                        component='img'
                        image={element.url}
                        alt='image'
                        className={css`
                            object-fit: contain;
                            max-width: ${maxWidth};
                            max-height: 90vh;
                            height: 100%;
                        `}
                    />
                    {element.typeImage == 'full' &&
                        <Button
                            active
                            onClick={() => Transforms.removeNodes(editor, { at: path })}
                            className={css`
                            display: 'inline';
                            position: absolute;
                            top: 0.5em;
                            left: 0.5em;
                            background-color: white;
                            `}
                        >
                            <DeleteIcon />
                        </Button>
                    }
                    {element.typeImage == 'half-left' &&
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {children}
                            </Typography>
                            <Button
                                active
                                onClick={() => Transforms.removeNodes(editor, { at: path })}
                                className={css`
                                    display: 'inline';
                                    position: absolute;
                                    top: 0.5em;
                                    left: 0.5em;
                                    background-color: white;
                                    `}
                            >
                                <DeleteIcon />
                            </Button>
                        </CardContent>
                    }
                </Box>
            </div>
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
                            // height: '80vh'
                        }}
                    />
                </Box>
            </div>
        </div>
    )
}

// Put this at the start and end of an inline component to work around this Chromium bug:
// https://bugs.chromium.org/p/chromium/issues/detail?id=1249405
const InlineChromiumBugfix = () => (
    <span
        contentEditable={false}
        className={css`
        font-size: 0;
      `}
    >
        ${String.fromCodePoint(160) /* Non-breaking space */}
    </span>
)

const LinkComponent = ({ attributes, children, element }) => {
    const selected = useSelected()
    return (
        <a
            {...attributes}
            href={element.url}
            className={
                selected
                    ? css`
                box-shadow: 0 0 0 3px #ddd;
              `
                    : css`
                    color: #0000ee;
                    text-decoration: none;
                    background-color: transparent;
                  `
            }
        >
            <InlineChromiumBugfix />
            {children}
            <InlineChromiumBugfix />
        </a>
    )
}

const DialogComponent = ({ search, openDialog, typeDialog, setVisible }) => {
    const editor = useSlateStatic()

    const [dialog, setDialog] = useState({
        open: false,
        type: 1
    })
    const [value, setValue] = useState({
        url: '',
        title: '',
        content: '',
    })
    const [type, setType] = useState('');
    const [error, setError] = useState({
        url: '',
        title: '',
        content: '',
    })

    const handleClose = () => {
        setError({
            url: '',
            title: '',
            content: '',
        })
        setValue({
            url: '',
            title: '',
            content: '',
        })

        setDialog(prev => { return { ...prev, open: false } });
        setVisible(false, dialog.type)
    };

    const handleInsertImage = () => {

        if (!isImageUrl(value.url)) {
            setError(prev => { return { ...prev, url: 'Không đúng đường dẫn ảnh!' } })
            return
        }
        insertImageCustomize(editor, value, type)

        handleClose()
    }

    const handleInsertLink = () => {

        if (!isUrl(value.url)) {
            setError(prev => { return { ...prev, url: 'Không đúng đường dẫn!' } })
            return
        }

        insertLink(editor, value.url, search)

        handleClose()
    }

    const handleChangeValue = (text, name) => {
        console.log('[text, name]', text, name)
        setValue(prev => { return { ...prev, [name]: text } })
        setError(prev => { return { ...prev, [name]: '' } })
    }

    const handleChange = (event) => {
        setType(event.target.value);
    };

    useEffect(() => {
        setType('full')
    }, [])

    useEffect(() => {
        setDialog(prev => { return { ...prev, open: !!openDialog ? true : false } })
    }, [openDialog])

    useEffect(() => {
        setDialog(prev => { return { ...prev, type: typeDialog } })
    }, [typeDialog])

    const renderChild = () => {

        let render = null

        if (dialog.type == 1) {
            render = (
                <>
                    <DialogTitle>{`Ảnh Tuỳ Chỉnh`}</DialogTitle>
                    <DialogContent>
                        {type != 'full' &&
                            <DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="title"
                                    name="title"
                                    label="Tiêu đề"
                                    placeholder='Nhập tiêu đề của ảnh'
                                    fullWidth
                                    required
                                    variant='outlined'
                                    error={!!value.title && !!error.title}
                                    helperText={error.title || ''}
                                    value={value.title}
                                    onChange={(e) => handleChangeValue(e.target.value, e.target.name)}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="content"
                                    name="content"
                                    label="Nội dung"
                                    placeholder='Nhập nội dung của ảnh'
                                    fullWidth
                                    required
                                    multiline
                                    minRows={3}
                                    maxRows={10}
                                    variant='outlined'
                                    error={!!value.content && !!error.content}
                                    helperText={error.content || ''}
                                    value={value.content}
                                    onChange={(e) => handleChangeValue(e.target.value, e.target.name)}
                                />
                            </DialogContentText>
                        }
                        <TextField
                            margin="dense"
                            id="url"
                            name="url"
                            label="Đường dẫn ảnh"
                            placeholder='Nhập đường dẫn của ảnh:'
                            variant='outlined'
                            fullWidth
                            required
                            autoFocus
                            error={!!value.url && !!error.url}
                            helperText={error.url || ''}
                            value={value.url}
                            onChange={(e) => handleChangeValue(e.target.value, e.target.name)}
                        />
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">{`Chiều rộng`}</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={type}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="full" control={<Radio />} label="100%" />
                                <FormControlLabel value="half-left" control={<Radio />} label="50% - Trái" />
                                <FormControlLabel value="half-right" control={<Radio />} label="50% - Phải" />
                            </RadioGroup>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <ButtonLib onClick={handleClose} variant='outlined' color='error'>{`Huỷ bỏ`}</ButtonLib>
                        <ButtonLib onClick={handleInsertImage} variant='contained' disabled={!value.url || !!error.url}>{`Đồng ý`}</ButtonLib>
                    </DialogActions>
                </>
            )
        }

        if (dialog.type == 2) {
            render = (
                <>
                    <DialogTitle>{`Liên kết bài viết`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <TextField
                                margin="dense"
                                id="url"
                                name="url"
                                label="Đường dẫn bài viết"
                                placeholder='Nhập đường dẫn của bài viết'
                                variant='outlined'
                                fullWidth
                                required
                                autoFocus
                                error={!!value.url && !!error.url}
                                helperText={error.url || ''}
                                value={value.url}
                                onChange={(e) => handleChangeValue(e.target.value, e.target.name)}
                            />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <ButtonLib onClick={handleClose} variant='outlined' color='error'>{`Huỷ bỏ`}</ButtonLib>
                        <ButtonLib onClick={handleInsertLink} variant='contained' disabled={!value.url || !!error.url}>{`Đồng ý`}</ButtonLib>
                    </DialogActions>
                </>
            )
        }
        return render
    }

    return (
        <Dialog
            fullWidth
            open={dialog.open}
            onClose={handleClose}
        >
            {renderChild()}
        </Dialog>
    )
}

const HoveringToolbar = ({ setOpenDialog }) => {
    const ref = useRef()
    const editor = useSlate()
    const inFocus = useFocused()

    useEffect(() => {
        const el = ref.current
        const { selection } = editor

        if (!el) {
            return
        }

        if (
            // !selection ||
            // Range.isCollapsed(selection) ||
            // Editor.string(editor, selection) === '' ||
            !inFocus
        ) {
            el.removeAttribute('style')
            return
        }

        const domSelection = window.getSelection()
        const domRange = domSelection.getRangeAt(0)
        const rect = domRange.getBoundingClientRect()
        console.log('rect', rect)
        const top = rect.top + window.pageYOffset - el.offsetHeight
        const left = rect.left + window.pageXOffset - el.offsetWidth + rect.width / 2

        el.style.opacity = '1'
        el.style.top = `${top}px`
        el.style.left = `${left > 0 ? left : 80}px`
        console.log('[ el.style.left]', el.style.left)
    })

    return (
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar>
                {/* // <Portal>
        //     <Menu
        //         ref={ref}
        //         className={css`
        //     padding: 8px 7px 6px;
        //     position: absolute;
        //     z-index: 9999;
        //     top: -10000px;
        //     left: -10000px;
        //     margin-top: -6px;
        //     opacity: 0;
        //     background-color: #6a6a6a;
        //     border-radius: 4px;
        //     transition: opacity 0.75s;
        //   `}
        //         onMouseDown={e => {
        //             e.preventDefault()
        //         }}
        //     > */}
                <MarkButton format="bold" icon="format_bold" Icon={() => <FormatBoldIcon />} />
                <MarkButton format="italic" icon="format_italic" Icon={() => <FormatItalicIcon />} />
                <MarkButton format="underline" icon="format_underlined" Icon={() => <FormatUnderlinedIcon />} />
                <MarkButton format="code" icon="code" Icon={() => <CodeIcon />} />
                <BlockButton format="heading-one" icon="looks_one" Icon={() => <LooksOneIcon />} />
                <BlockButton format="heading-two" icon="looks_two" Icon={() => <LooksTwoIcon />} />
                <BlockButton format="heading-three" icon="three" Icon={() => <LooksThreeIcon />} />
                <BlockButton format="heading-four" icon="four" Icon={() => <LooksFourIcon />} />
                <BlockButton format="heading-five" icon="five" Icon={() => <LooksFiveIcon />} />
                <BlockButton format="heading-six" icon="six" Icon={() => <LooksSixIcon />} />
                <BlockButton format="block-quote" icon="format_quote" Icon={() => <FormatQuoteIcon />} />
                <BlockButton format="numbered-list" icon="format_list_numbered" Icon={() => <FormatListNumberedIcon />} />
                <BlockButton format="bulleted-list" icon="format_list_bulleted" Icon={() => <FormatListBulletedIcon />} />
                <BlockButton format="left" icon="format_align_left" Icon={() => <FormatAlignLeftIcon />} />
                <BlockButton format="center" icon="format_align_center" Icon={() => <FormatAlignCenterIcon />} />
                <BlockButton format="right" icon="format_align_right" Icon={() => <FormatAlignRightIcon />} />
                <BlockButton format="justify" icon="format_align_justify" Icon={() => <FormatAlignJustifyIcon />} />
                <InsertImageButton format="image" icon="insert_image" Icon={() => <ImageIcon />} />
                <InsertImageCustomizeButton format="image-customize" icon="insert_image_customize" Icon={() => <BurstModeIcon />} onClickOpen={() => setOpenDialog(true, 1)} />
                <InsertVideoButton format="video" icon="insert_video" Icon={() => <YouTubeIcon />} />
                <AddLinkButton format="link" icon="insert_link" Icon={() => <AddLinkIcon />} />
                <RemoveLinkButton format="link" icon="insert_link" Icon={() => <RemoveLinkIcon />} />
                {/* </Menu>
        </Portal> */}
            </Toolbar>
        </AppBar>
    )
}

export default memo(SlateEditor)
