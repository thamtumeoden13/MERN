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

import { Button, Toolbar } from './Component'

import { deserialize, isImageUrl } from '../../../utils'
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
    const [editor] = useState(() => withHtml(withEmbeds(withImages(withReact(withHistory(createEditor()))))))
    const [open, setOpen] = useState(false);

    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])

    const handleChange = (value) => {
        console.log('[handleChange]', value)
        setValue(value)
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

    // console.log('[value]', value)

    if (!!isLoading || (!isLoading && (!value || value.length <= 0))) {
        return (
            <div >
                <CircularProgress size={100} />
            </div>
        )
    }

    return (
        <div>
            <Slate editor={editor} value={value} onChange={value => handleChange(value)}>
                <Toolbar>
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
                    <InsertImageCustomizeButton format="image-customize" icon="insert_image_customize" Icon={() => <BurstModeIcon />} onClickOpen={() => setOpen(true)} />
                    <InsertVideoButton format="video" icon="insert_video" Icon={() => <YouTubeIcon />} />
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
                <DialogComponent visible={open} setVisible={() => setOpen(false)} />
            </Slate>
        </div>
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

const DialogComponent = ({ visible, setVisible }) => {
    const editor = useSlateStatic()

    const [open, setOpen] = useState(false);
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
        setOpen(false);
        setVisible(false)
    };

    const handleInsertImage = () => {

        if (!isImageUrl(value.url)) {
            setError(prev => { return { ...prev, url: 'Không đúng đường dẫn ảnh!' } })
            return
        }
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

        insertImageCustomize(editor, value, type)

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
        setOpen(!!visible ? true : false)
    }, [visible])

    return (
        <Dialog open={open} onClose={handleClose}>
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
        </Dialog>
    )
}
export default memo(SlateEditor)
