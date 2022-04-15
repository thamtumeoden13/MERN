import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'

import Container from '@mui/material/Container'
import Grow from '@mui/material/Grow'
import Grid from '@mui/material/Grid'

import { getProjectDetails, createProjectDetail, updateProjectDetail } from '../../redux/actions/projectDetails'
import { getProjects } from '../../redux/actions/projects'

// import Products from '../Products';
import Form from './Form';
import ProjectDetailTableList from './ProjectDetailTableList'
import SlateEditor from '../../components/common/SlateEditor';

import useStyles from './styles'

const initialValue = [{ "type": "paragraph", "children": [{ "type": "link", "url": "https://neohouse.vn/portfolio/thiet-ke-nha-pho-hien-dai-np04/", "children": [{ "text": "Thiết kế nhà phố 4x16m" }] }, { "text": " 3 tầng có gara được khá nhiều khách hàng gửi yêu cầu tư vấn thiết kế đến cho công ty của chúng tôi. Hầu hết nhu cầu của khách hàng đều hướng đến một không gian sống thông thoáng, mặt tiền kiến trúc hiện đại và tiết kiệm chi phí đầu tư." }] }, { "type": "paragraph", "children": [{ "text": "Để khách hàng có thể có thể giải đáp cũng như có thêm nhiều phương án thiết kế thi công cho công trong trong tương lai, cũng như hoàn thiện những ý tưởng cho căn nhà của mình, hãy cùng khám phá mẫu thiết kế nhà phố 3 tầng 4x16m tại Tphcm sau đây nhé!" }] }, { "type": "heading-two", "children": [{ "text": "Yêu cầu tư vấn thiết kế nhà phố 4x16m 3 tầng tại Tphcm", "bold": true }] }, { "type": "paragraph", "children": [{ "text": "Sau khi trao đổi gián tiếp qua điện thoại và chat trực tuyến trên ứng dụng Zalo, chủ đầu tư đã liệt kê toàn bộ những mong muốn về mặt bằng công năng và phối cảnh kiến trúc cũng như nhu cầu của gia đình, mong sớm có phương án thiết kế nhà từ kiến trúc sư." }] }, { "type": "paragraph", "children": [{ "text": "Điều kiện thi công thực tế của gia đình chủ đầu tư bao gồm như sau:", "bold": true }] }, { "type": "paragraph", "children": [{ "text": "Sở hữu khu đất có chiều ngang 4m, chiều dài 16m." }] }, { "type": "paragraph", "children": [{ "text": "Nền đất tương đối cứng, hình khối vuông vắn và khá thoáng mát." }] }, { "type": "paragraph", "children": [{ "text": "Kiến trúc xung quanh chủ yếu là những căn nhà phố cao tầng, thiết kế đơn giản, hiện đại." }] }, { "type": "paragraph", "children": [{ "text": "Kinh phí đầu tư không vượt quá 1 tỷ đồng." }] }, { "type": "paragraph", "children": [{ "text": "Mong muốn và nhu cầu thiết kế nhà phố của gia đình như sau:", "bold": true }] }, { "type": "paragraph", "children": [{ "text": "Thiết kế thi công nhà phố 4x16m 3 tầng hiện đại." }] }, { "type": "paragraph", "children": [{ "text": "Thiết kế bố trí công năng đơn giản nhưng khoa học và đảm bảo đầy đủ chức năng, bao gồm không gian phòng khách, phòng bếp." }] }, { "type": "paragraph", "children": [{ "text": "Bố trí 4 phòng ngủ, trong đó 1 phòng ngủ dự phòng, 1 phòng ngủ Master, 2 phòng ngủ cho các con và phòng vệ sinh chung." }] }, { "type": "paragraph", "children": [{ "text": "Thiết kế phòng thờ hướng ra ban công mặt tiền, tạo được sự trang nghiệm và thông thoáng cho khu vực này, bố trí sân thượng sau làm khu vực sân phơi, tất cả đảm bảo cho sự kết nối giữa các phòng chức năng sao cho thoải mái và thuận tiện cho việc di chuyển." }] }, { "type": "paragraph", "children": [{ "text": "Kiến trúc ngoại thất thiết kế đơn giản, sử dụng các tông màu trung tính, hài hòa, mặt tiền kiên cố, ban công thiết kế lan can và hệ thống cửa bằng chất liệu kính cường lực để đảm bảo cho việc phân bổ ánh sáng tự nhiên cũng như đón nhận những dòng vượng khí vào bên trong nhà." }] }, { "type": "paragraph", "children": [{ "text": "Tiếp nhận những yêu cầu tư vấn " }, { "type": "link", "url": "https://neohouse.vn/du-an/nha-pho/", "children": [{ "text": "thiết kế nhà phố" }] }, { "text": " trên của gia đình chủ đầu tư, kiến trúc sư đã nhanh chóng tiến hành họp bàn và trao đổi về phương án sơ bộ, chuẩn bị đầy đủ cho buổi gặp trao đổi trực tiếp cũng như chốt phương án cuối cùng với chủ đầu tư." }] }, { "type": "heading-two", "children": [{ "text": "Chiêm ngưỡng mẫu thiết kế nhà phố 4x16m tại Tphcm", "bold": true }] }, { "type": "paragraph", "children": [{ "text": "Ngắm nhìn từ xa mẫu thiết kế nhà phố 3 tầng sở hữu hình khối kiến trúc vuông vắn và kiến cố. Khang trang nhưng không quá phô trương, tuy nhiên với những đường nét kiến trúc thẳng và mặt phẳng mặt tiền trước, cùng khối tạo hình độc đáo tại lầu 2 tạo điểm nhấn khá lôi cuốn với những căn nhà phố cùng phong cách thiết kế." }] }, { "type": "paragraph", "children": [{ "text": "Hệ thống trần mái được ốp gỗ nhựa ngoài trời, kết hợp mái che sắt phun sơn tĩnh điện, khối ban công lầu 1 và lầu 2 đua ra rộng so với tầng trệt gần 1m. Điều này vừa góp phần làm cho hình khối chung trong tổng thể cân đối, vừa góp phần tạo cho không gian mặt tiền trở nên nổi bật hơn." }] }, { "type": "paragraph", "children": [{ "text": "Tầng trệt được thiết kế sân trước vừa tận dụng làm khu vực gara ô tô vừa bố trí một khu vực sân vườn tiểu cảnh nhỏ để mang thiên nhiên vào trong nhà. Hệ thống cửa chính sử dụng chất liệu kính, có kích thước lớn, sử dụng rèm đem đến sự thông thoáng và mát mẻ cho không gian tầng trệt." }] }, { "type": "paragraph", "children": [{ "text": "Kiến trúc mặt tiền tầng 2 sử hệ vật liệu cửa kính khung nhốm xinfa, đi cùng bồn cây xanh phía trước ban công và lan can kính cường lực, đảm bảo cho không gian mặt tiền hạn hẹp trở nên thoáng mát và đón nhận được nhiều ánh sáng tự nhiên, những dòng vượng khí tươi tốt vào bên trong căn nhà phố, điều kiện mà chủ đầu tư khá chú trọng đến." }] }, { "type": "paragraph", "children": [{ "text": "Mẫu " }, { "text": "thiết kế nhà phố 4x16m", "bold": true }, { "text": " 3 tầng với mặt tiền đơn giản từ hình khối kiến trúc cho đến cách sử dụng màu sắc ngoại thất, Mỗi chi tiết cũng như bố cục, sự phân chia đều được kiến trúc sư tính toán kỹ lưỡng và chi tiết. Mẫu thiết kế nhà phố đẹp 3 tầng đã hoàn toàn chinh phục chủ đầu tư ngay sau khi hoàn thiện phối cảnh." }] }, { "type": "heading-two", "children": [{ "text": "Mặt bằng công năng thiết kế nhà phố 4x16m", "bold": true }] }, { "type": "paragraph", "children": [{ "text": "Mặt bằng công năng dựa trên những nhu cầu của chủ đầu tư, kiến trúc sư đã nghiên cứu khá kỹ trước khi tiến hành thiết kế. Từ những phòng chức năng sinh hoạt riêng cho đến không gian sinh hoạt chung, tất cả đều đảm bảo sự thoải mái và tiện nghi." }] }, { "type": "paragraph", "children": [{ "text": "Mặt bằng tầng trệt mẫu " }, { "text": "thiết kế nhà phố 4x16m", "bold": true, "italic": true }, { "text": " có gara ô tô thiết kế phía trước sân, vừa tận dụng làm khu vực gara vừa có tiểu cảnh nhỏ. Bước vào trong nhà là không gian phòng khách, bố trí sát cạnh cửa chính, đảm bảo cho sự lưu thông khí cho khu vực này. Thiết kế liên lông với phòng khách là khu vực bếp + ăn, không gian này kiến trúc sư chú trọng đến việc thoáng khí, tránh mùi thức ăn đọng lại nên chủ đầu tư khá hài lòng. Tiếp đến là cầu thang thông tầng và phòng vệ sinh chung, cùng 1 phòng ngủ." }] }, { "type": "paragraph", "children": [{ "text": "Lầu 1 thiết kế 2 phòng ngủ, 1 phòng ngủ hướng ra ban cộng mặt tiền, 1 phòng ngủ đặt cuối nhà, trung tâm bố trí 1 phòng sinh hoạt chung và 1 nhà vệ sinh chung đặt sát bên, thiết kế thông tầng tạo sự kết nối giữa các tầng với nhau. Đây được xem là không gian sinh hoạt riêng tư của gia đình nên được bố trí và tính toán khá kỹ lưỡng." }] }, { "type": "paragraph", "children": [{ "text": "Công năng lầu 2 được thiết kế 1 phòng ngủ dự phòng có diện tích vừa phải, không quá rộng, sát bên phòng ngủ là phòng vệ sinh chung và cầu thang thông tầng. Phòng thờ bố trí hướng ra ban công mặt tiền và có sân thượng nhỏ. Cuối nhà là khu vực giặt, cùng sân thượng sau bố trí làm khu vực sân phơi." }] }, { "type": "paragraph", "children": [{ "text": "Mẫu " }, { "text": "thiết kế nhà phố 4x16m", "bold": true }, { "text": " 3 tầng hiện đại, mặt bằng công năng khoa học, cùng với mức đầu tư chi phí vô cùng hợp lý, hoàn toàn có thể thích ứng với nhiều hộ gia đình hiện nay. Nếu như các bạn yêu thích mẫu thiết kế nhà phố hiện đại trên của chúng tôi, hãy liên hệ ngay đến văn phòng công ty qua hotline: " }, { "text": "0937.100.202 – 0906.100.202", "bold": true }, { "text": ", hoặc truy cập vào website " }, { "type": "link", "url": "https://neohouse.vn/", "children": [{ "text": "neohouse.vn" }] }, { "text": " để lại email – sđt, bộ phậm chăm sóc khàng hàng và kiến trúc sư sẽ liên hệ tư vấn trực tiếp cho bạn." }, { "type": "link", "url": "https://neohouse.vn/portfolio/thiet-ke-nha-pho-hien-dai-np04/", "children": [{ "type": "image", "url": "https://neohouse.vn/wp-content/uploads/2017/05/nha-pho-hien-dai-sai-gon1-neohouse.vn_-1.jpg", "children": [{ "text": "" }] }] }, { "type": "link", "url": "https://neohouse.vn/portfolio/thiet-ke-nha-pho-hien-dai-np04/", "children": [{ "type": "image", "url": "https://neohouse.vn/wp-content/uploads/2017/05/nha-pho-hien-dai-sai-gon1-neohouse.vn_-1.jpg", "children": [{ "text": "" }] }] }, { "type": "link", "url": "https://neohouse.vn/portfolio/thiet-ke-nha-pho-hien-dai-np04/", "children": [{ "type": "image", "url": "https://neohouse.vn/wp-content/uploads/2017/05/nha-pho-hien-dai-sai-gon-3-neohouse.vn_.jpg", "children": [{ "text": "" }] }] }, { "type": "link", "url": "https://neohouse.vn/portfolio/thiet-ke-nha-pho-hien-dai-np04/", "children": [{ "type": "image", "url": "https://neohouse.vn/wp-content/uploads/2017/05/nha-pho-hien-dai-sai-gon-1-neohouse.vn_.jpg", "children": [{ "text": "" }] }] }, { "type": "link", "url": "https://neohouse.vn/portfolio/thiet-ke-nha-pho-hien-dai-np04/", "children": [{ "type": "image", "url": "https://neohouse.vn/wp-content/uploads/2017/07/Ban-ve-nha-pho-3-tang-tret-1.jpg", "children": [{ "text": "" }] }] }, { "type": "link", "url": "https://neohouse.vn/portfolio/thiet-ke-nha-pho-hien-dai-np04/", "children": [{ "type": "image", "url": "https://neohouse.vn/wp-content/uploads/2017/07/Ban-ve-nha-pho-3-tang-lau-1-1.jpg", "children": [{ "text": "" }] }] }, { "type": "link", "url": "https://neohouse.vn/portfolio/thiet-ke-nha-pho-hien-dai-np04/", "children": [{ "type": "image", "url": "https://neohouse.vn/wp-content/uploads/2017/07/Ban-ve-nha-pho-3-tang-lau-2-1.jpg", "children": [{ "text": "" }] }] }, { "text": "\n" }] }]

const ProjectDetailAdmin = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const { projectDetails, isLoading } = useSelector((state) => state.projectDetails)

    const [currentId, setCurrentId] = useState(0)
    const [user, setUser] = useState(null)
    const [description, setDescription] = useState('')

    useEffect(() => {
        dispatch(getProjects())
        dispatch(getProjectDetails())
    }, [dispatch])

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const handleCurrentId = (id) => {
        setCurrentId(id)
    }

    const handleSubmitForm = (data) => {
        console.log('handleSubmitForm', data)
        if (!!currentId) {
            dispatch(updateProjectDetail(currentId, { ...data, description: description, createdByName: user?.result?.name }))
        } else {
            dispatch(createProjectDetail({ ...data, description: description, createdByName: user?.result?.name }, navigate))
        }
    }

    const handleChangeDescription = (description) => {
        console.log('handleChangeDescription', description)
    }

    console.log({ projectDetails })
    // if (!projectDetails.length && !isLoading) return null

    return (
        <Grow in>
            <Container maxWidth='xl' sx={{ mt: 15 }}>
                <Grid container display='flex' flexDirection='column' spacing={3}>
                    <Grid className={classes.gridContainer} container item justifyContent='space-between' alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={6} md={8} >
                            <ProjectDetailTableList data={projectDetails} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Form currentId={currentId} handleCurrentId={handleCurrentId} onSubmit={handleSubmitForm} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12}
                    sx={{
                        minHeight: '100vh',
                        margin: '10px 0',
                        backgroundColor: 'white',
                        boxShadow: '2px 4px 10px #888888'
                    }}
                >
                    <SlateEditor initialValue={initialValue} onChange={handleChangeDescription} />
                </Grid>
            </Container>
        </Grow>
    );
}

export default ProjectDetailAdmin;
