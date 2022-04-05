import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import imageExtensions from 'image-extensions'
import isUrl from 'is-url'
import { css } from '@emotion/css'

import AppBar from '@mui/material/AppBar'
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

import { deserialize } from '../../../utils'
import ElevationScroll from '../../NavBar/ElevationScroll'

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

const SlateEditor = (props, { onChange }) => {
    const timeoutRef = useRef(null)

    const [value, setValue] = useState(initialValue)
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editor = useMemo(() => withHtml(withImages(withHistory(withReact(createEditor())))), [])

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
            if (onChange) {
                onChange(JSON.stringify(value))
            }
        }, 500);
    }, [value])

    return (
        <Slate editor={editor} value={value} onChange={value => setValue(value)}>
            {/* <ElevationScroll {...props}> */}
            {/* <AppBar color='inherit'> */}
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
            {/* </AppBar> */}
            {/* </ElevationScroll> */}
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Enter some rich text…"
                spellCheck
                autoFocus
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
    console.log('[insertImage]', editor, url)
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

    console.log('[withImages]', editor)

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
}

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
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
            active={isMarkActive(editor, format)}
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
                <img
                    src={element.url}
                    className={
                        css`
                            display: block;
                            max-width: 100%;
                            max-height: 20em;
                            box-shadow: ${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'};
                        `
                    }
                    alt='img'
                />
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

const isImageUrl = url => {
    if (!url) return false
    if (!isUrl(url)) return false
    const ext = new URL(url).pathname.split('.').pop()
    return imageExtensions.includes(ext)
}

const initialValue = [{ "type": "paragraph", "children": [{ "type": "link", "url": "https://neohouse.vn/portfolio/thiet-ke-nha-pho-hien-dai-np04/", "children": [{ "text": "Thiết kế nhà phố 4x16m" }] }, { "text": " 3 tầng có gara được khá nhiều khách hàng gửi yêu cầu tư vấn thiết kế đến cho công ty của chúng tôi. Hầu hết nhu cầu của khách hàng đều hướng đến một không gian sống thông thoáng, mặt tiền kiến trúc hiện đại và tiết kiệm chi phí đầu tư." }] }, { "type": "paragraph", "children": [{ "text": "Để khách hàng có thể có thể giải đáp cũng như có thêm nhiều phương án thiết kế thi công cho công trong trong tương lai, cũng như hoàn thiện những ý tưởng cho căn nhà của mình, hãy cùng khám phá mẫu thiết kế nhà phố 3 tầng 4x16m tại Tphcm sau đây nhé!" }] }, { "type": "heading-two", "children": [{ "text": "Yêu cầu tư vấn thiết kế nhà phố 4x16m 3 tầng tại Tphcm", "bold": true }] }, { "type": "paragraph", "children": [{ "text": "Sau khi trao đổi gián tiếp qua điện thoại và chat trực tuyến trên ứng dụng Zalo, chủ đầu tư đã liệt kê toàn bộ những mong muốn về mặt bằng công năng và phối cảnh kiến trúc cũng như nhu cầu của gia đình, mong sớm có phương án thiết kế nhà từ kiến trúc sư." }] }, { "type": "paragraph", "children": [{ "text": "Điều kiện thi công thực tế của gia đình chủ đầu tư bao gồm như sau:", "bold": true }] }, { "type": "paragraph", "children": [{ "text": "Sở hữu khu đất có chiều ngang 4m, chiều dài 16m." }] }, { "type": "paragraph", "children": [{ "text": "Nền đất tương đối cứng, hình khối vuông vắn và khá thoáng mát." }] }, { "type": "paragraph", "children": [{ "text": "Kiến trúc xung quanh chủ yếu là những căn nhà phố cao tầng, thiết kế đơn giản, hiện đại." }] }, { "type": "paragraph", "children": [{ "text": "Kinh phí đầu tư không vượt quá 1 tỷ đồng." }] }, { "type": "paragraph", "children": [{ "text": "Mong muốn và nhu cầu thiết kế nhà phố của gia đình như sau:", "bold": true }] }, { "type": "paragraph", "children": [{ "text": "Thiết kế thi công nhà phố 4x16m 3 tầng hiện đại." }] }, { "type": "paragraph", "children": [{ "text": "Thiết kế bố trí công năng đơn giản nhưng khoa học và đảm bảo đầy đủ chức năng, bao gồm không gian phòng khách, phòng bếp." }] }, { "type": "paragraph", "children": [{ "text": "Bố trí 4 phòng ngủ, trong đó 1 phòng ngủ dự phòng, 1 phòng ngủ Master, 2 phòng ngủ cho các con và phòng vệ sinh chung." }] }, { "type": "paragraph", "children": [{ "text": "Thiết kế phòng thờ hướng ra ban công mặt tiền, tạo được sự trang nghiệm và thông thoáng cho khu vực này, bố trí sân thượng sau làm khu vực sân phơi, tất cả đảm bảo cho sự kết nối giữa các phòng chức năng sao cho thoải mái và thuận tiện cho việc di chuyển." }] }, { "type": "paragraph", "children": [{ "text": "Kiến trúc ngoại thất thiết kế đơn giản, sử dụng các tông màu trung tính, hài hòa, mặt tiền kiên cố, ban công thiết kế lan can và hệ thống cửa bằng chất liệu kính cường lực để đảm bảo cho việc phân bổ ánh sáng tự nhiên cũng như đón nhận những dòng vượng khí vào bên trong nhà." }] }, { "type": "paragraph", "children": [{ "text": "Tiếp nhận những yêu cầu tư vấn " }, { "type": "link", "url": "https://neohouse.vn/du-an/nha-pho/", "children": [{ "text": "thiết kế nhà phố" }] }, { "text": " trên của gia đình chủ đầu tư, kiến trúc sư đã nhanh chóng tiến hành họp bàn và trao đổi về phương án sơ bộ, chuẩn bị đầy đủ cho buổi gặp trao đổi trực tiếp cũng như chốt phương án cuối cùng với chủ đầu tư." }] }, { "type": "heading-two", "children": [{ "text": "Chiêm ngưỡng mẫu thiết kế nhà phố 4x16m tại Tphcm", "bold": true }] }, { "type": "paragraph", "children": [{ "text": "Ngắm nhìn từ xa mẫu thiết kế nhà phố 3 tầng sở hữu hình khối kiến trúc vuông vắn và kiến cố. Khang trang nhưng không quá phô trương, tuy nhiên với những đường nét kiến trúc thẳng và mặt phẳng mặt tiền trước, cùng khối tạo hình độc đáo tại lầu 2 tạo điểm nhấn khá lôi cuốn với những căn nhà phố cùng phong cách thiết kế." }] }, { "type": "paragraph", "children": [{ "text": "Hệ thống trần mái được ốp gỗ nhựa ngoài trời, kết hợp mái che sắt phun sơn tĩnh điện, khối ban công lầu 1 và lầu 2 đua ra rộng so với tầng trệt gần 1m. Điều này vừa góp phần làm cho hình khối chung trong tổng thể cân đối, vừa góp phần tạo cho không gian mặt tiền trở nên nổi bật hơn." }] }, { "type": "paragraph", "children": [{ "text": "Tầng trệt được thiết kế sân trước vừa tận dụng làm khu vực gara ô tô vừa bố trí một khu vực sân vườn tiểu cảnh nhỏ để mang thiên nhiên vào trong nhà. Hệ thống cửa chính sử dụng chất liệu kính, có kích thước lớn, sử dụng rèm đem đến sự thông thoáng và mát mẻ cho không gian tầng trệt." }] }, { "type": "paragraph", "children": [{ "text": "Kiến trúc mặt tiền tầng 2 sử hệ vật liệu cửa kính khung nhốm xinfa, đi cùng bồn cây xanh phía trước ban công và lan can kính cường lực, đảm bảo cho không gian mặt tiền hạn hẹp trở nên thoáng mát và đón nhận được nhiều ánh sáng tự nhiên, những dòng vượng khí tươi tốt vào bên trong căn nhà phố, điều kiện mà chủ đầu tư khá chú trọng đến." }] }, { "type": "paragraph", "children": [{ "text": "Mẫu " }, { "text": "thiết kế nhà phố 4x16m", "bold": true }, { "text": " 3 tầng với mặt tiền đơn giản từ hình khối kiến trúc cho đến cách sử dụng màu sắc ngoại thất, Mỗi chi tiết cũng như bố cục, sự phân chia đều được kiến trúc sư tính toán kỹ lưỡng và chi tiết. Mẫu thiết kế nhà phố đẹp 3 tầng đã hoàn toàn chinh phục chủ đầu tư ngay sau khi hoàn thiện phối cảnh." }] }, { "type": "heading-two", "children": [{ "text": "Mặt bằng công năng thiết kế nhà phố 4x16m", "bold": true }] }, { "type": "paragraph", "children": [{ "text": "Mặt bằng công năng dựa trên những nhu cầu của chủ đầu tư, kiến trúc sư đã nghiên cứu khá kỹ trước khi tiến hành thiết kế. Từ những phòng chức năng sinh hoạt riêng cho đến không gian sinh hoạt chung, tất cả đều đảm bảo sự thoải mái và tiện nghi." }] }, { "type": "paragraph", "children": [{ "text": "Mặt bằng tầng trệt mẫu " }, { "text": "thiết kế nhà phố 4x16m", "bold": true, "italic": true }, { "text": " có gara ô tô thiết kế phía trước sân, vừa tận dụng làm khu vực gara vừa có tiểu cảnh nhỏ. Bước vào trong nhà là không gian phòng khách, bố trí sát cạnh cửa chính, đảm bảo cho sự lưu thông khí cho khu vực này. Thiết kế liên lông với phòng khách là khu vực bếp + ăn, không gian này kiến trúc sư chú trọng đến việc thoáng khí, tránh mùi thức ăn đọng lại nên chủ đầu tư khá hài lòng. Tiếp đến là cầu thang thông tầng và phòng vệ sinh chung, cùng 1 phòng ngủ." }] }, { "type": "paragraph", "children": [{ "text": "Lầu 1 thiết kế 2 phòng ngủ, 1 phòng ngủ hướng ra ban cộng mặt tiền, 1 phòng ngủ đặt cuối nhà, trung tâm bố trí 1 phòng sinh hoạt chung và 1 nhà vệ sinh chung đặt sát bên, thiết kế thông tầng tạo sự kết nối giữa các tầng với nhau. Đây được xem là không gian sinh hoạt riêng tư của gia đình nên được bố trí và tính toán khá kỹ lưỡng." }] }, { "type": "paragraph", "children": [{ "text": "Công năng lầu 2 được thiết kế 1 phòng ngủ dự phòng có diện tích vừa phải, không quá rộng, sát bên phòng ngủ là phòng vệ sinh chung và cầu thang thông tầng. Phòng thờ bố trí hướng ra ban công mặt tiền và có sân thượng nhỏ. Cuối nhà là khu vực giặt, cùng sân thượng sau bố trí làm khu vực sân phơi." }] }, { "type": "paragraph", "children": [{ "text": "Mẫu " }, { "text": "thiết kế nhà phố 4x16m", "bold": true }, { "text": " 3 tầng hiện đại, mặt bằng công năng khoa học, cùng với mức đầu tư chi phí vô cùng hợp lý, hoàn toàn có thể thích ứng với nhiều hộ gia đình hiện nay. Nếu như các bạn yêu thích mẫu thiết kế nhà phố hiện đại trên của chúng tôi, hãy liên hệ ngay đến văn phòng công ty qua hotline: " }, { "text": "0937.100.202 – 0906.100.202", "bold": true }, { "text": ", hoặc truy cập vào website " }, { "type": "link", "url": "https://neohouse.vn/", "children": [{ "text": "neohouse.vn" }] }, { "text": " để lại email – sđt, bộ phậm chăm sóc khàng hàng và kiến trúc sư sẽ liên hệ tư vấn trực tiếp cho bạn." }, { "type": "link", "url": "https://neohouse.vn/portfolio/thiet-ke-nha-pho-hien-dai-np04/", "children": [{ "type": "image", "url": "https://neohouse.vn/wp-content/uploads/2017/05/nha-pho-hien-dai-sai-gon1-neohouse.vn_-1.jpg", "children": [{ "text": "" }] }] }, { "type": "link", "url": "https://neohouse.vn/portfolio/thiet-ke-nha-pho-hien-dai-np04/", "children": [{ "type": "image", "url": "https://neohouse.vn/wp-content/uploads/2017/05/nha-pho-hien-dai-sai-gon1-neohouse.vn_-1.jpg", "children": [{ "text": "" }] }] }, { "type": "link", "url": "https://neohouse.vn/portfolio/thiet-ke-nha-pho-hien-dai-np04/", "children": [{ "type": "image", "url": "https://neohouse.vn/wp-content/uploads/2017/05/nha-pho-hien-dai-sai-gon-3-neohouse.vn_.jpg", "children": [{ "text": "" }] }] }, { "type": "link", "url": "https://neohouse.vn/portfolio/thiet-ke-nha-pho-hien-dai-np04/", "children": [{ "type": "image", "url": "https://neohouse.vn/wp-content/uploads/2017/05/nha-pho-hien-dai-sai-gon-1-neohouse.vn_.jpg", "children": [{ "text": "" }] }] }, { "type": "link", "url": "https://neohouse.vn/portfolio/thiet-ke-nha-pho-hien-dai-np04/", "children": [{ "type": "image", "url": "https://neohouse.vn/wp-content/uploads/2017/07/Ban-ve-nha-pho-3-tang-tret-1.jpg", "children": [{ "text": "" }] }] }, { "type": "link", "url": "https://neohouse.vn/portfolio/thiet-ke-nha-pho-hien-dai-np04/", "children": [{ "type": "image", "url": "https://neohouse.vn/wp-content/uploads/2017/07/Ban-ve-nha-pho-3-tang-lau-1-1.jpg", "children": [{ "text": "" }] }] }, { "type": "link", "url": "https://neohouse.vn/portfolio/thiet-ke-nha-pho-hien-dai-np04/", "children": [{ "type": "image", "url": "https://neohouse.vn/wp-content/uploads/2017/07/Ban-ve-nha-pho-3-tang-lau-2-1.jpg", "children": [{ "text": "" }] }] }, { "text": "\n" }] }]

// const initialValue = [
//     {
//         type: 'paragraph',
//         children: [
//             { text: 'This is editable ' },
//             { text: 'rich', bold: true },
//             { text: ' text, ' },
//             { text: 'much', italic: true },
//             { text: ' better than a ' },
//             { text: '<textarea>', code: true },
//             { text: '!' },
//         ],
//     },
//     {
//         type: 'paragraph',
//         children: [
//             {
//                 text:
//                     "Since it's rich text, you can do things like turn a selection of text ",
//             },
//             { text: 'bold', bold: true },
//             {
//                 text:
//                     ', or add a semantically rendered block quote in the middle of the page, like this:',
//             },
//         ],
//     },
//     {
//         type: 'block-quote',
//         children: [{ text: 'A wise quote.' }],
//     },
//     {
//         type: 'paragraph',
//         align: 'center',
//         children: [{ text: 'Try it out for yourself!' }],
//     },
//     {
//         type: 'image',
//         url: 'https://source.unsplash.com/kFrdX5IeQzI',
//         children: [{ text: '' }],
//     },
// ]

export default SlateEditor