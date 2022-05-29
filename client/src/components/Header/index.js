import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Box from '@mui/material/Box'
import Grow from '@mui/material/Grow';

import CarouselImage from '../CarouselImage'

import MusicPlayerSlider from "../Musicplayer";
import CardAnimation from '../CardAnimation'

import useStyle from './styles'

const items = [
    {
        name: "Random Name #1",
        title: "La Casa-Nội Thất Khu Phức Hợp Cao Cấp, Quận 7",
        description: "La casa là dự án căn hộ cao cấp nằm trong khu phức hợp gồm các dự án An gia Riverside, An gia Skyline bên dòng sông nhà bè nên có nhiều view nhìn đẹp, không gian xanh, thuộc dự án nội thất trang thiết bị cao cấp của tập đoàn Vạn Phát Hưng.",
        route: "chi-tiet-du-an/6264c024f47761c9f6bfec82",
        imageUrl: 'https://images.pexels.com/photos/32870/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
        name: "Random Name #2",
        title: "INDOCHINE STYLE INTERIOR",
        description: "Phong cách thiết kế nội thất kiểu Đông Dương pha nét hiện đại đang là xu hướng thiết kế hiện nay mang nét đặc trưng và độc lạ. Đây là nội thất biệt thự vườn tại Biên Hòa, Đồng Nai trong tháng 07 này.",
        route: "chi-tiet-du-an/6264bf81f47761c9f6bfec7d",
        imageUrl: 'https://images.pexels.com/photos/32870/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
        name: "Random Name #3",
        title: "KTS. Phương với Kiến trúc độc đáo trong nhà phố hiện đại",
        description: "Chào tháng 6-2021 với thiết kế hiện đại, độc đáo và sang trọng nhà phố 5 tầng tại Đà Nẵng. Đây là công trình do KTS. Văn Phương chủ trì cùng các anh em công ty NEOhouse thực hiện.",
        route: "chi-tiet-du-an/6264bf81f47761c9f6bfec7d",
        imageUrl: 'https://images.pexels.com/photos/3209049/pexels-photo-3209049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
        name: "Random Name #4",
        title: "Biệt thự 3 tầng hiện đại tại Quận Tân Phú – Tháng 06.2021",
        description: "Đây là một đứa con tinh thần mà đôi vợ chồng chị Thảo muốn gửi gắm vào KTS NEOhouse thực hiện sáng tác để khởi công vào tháng 6 này cũng như mong muốn hoàn thiện kịp trước tết phần nội thất, sân vườn. Thực hiện bởi đội thợ xây Neohouse.",
        route: "chi-tiet-du-an/6264bf81f47761c9f6bfec7d",
        imageUrl: 'https://images.pexels.com/photos/2290753/pexels-photo-2290753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
        name: "Random Name #5",
        title: "Tháng 11: Kiến Trúc Biệt Thự Mái Thái 2 Tầng Tại Quận 7",
        description: "Chủ đề tiêu biểu cho thiết kế tháng này là kiến trúc biệt thự mái thái và các biệt thự bán cổ điển, hiện đại. Nổi bật là công trình nhà anh Quỳnh tại Q.7 thuộc khu đất dự án, KTS NEOhouse đã tạo hình lại phối cảnh bên ngoài công trình so với mẫu quy định nhưng vẫn đảm bảo phù hợp nhu cầu của chủ dự án.",
        route: "chi-tiet-du-an/6264bf81f47761c9f6bfec7d",
        imageUrl: 'https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
        name: "Random Name #6",
        title: "Chào Tháng 12 Với Kiến Trúc Biệt Thự Tân Cổ Điển Tráng Lệ Tại Bắc Ninh",
        description: "Vẻ đẹp từ đường nét phào chỉ mềm mại mà KTS NEOhouse muốn giới thiệu cho quý khách là dự án thiết kế biệt thự 4 tầng 1 tum tân cổ điển trong tháng 12 này. Đây sẽ là một công trình ấn tượng và nguy nga với hình thức bên ngoài, sang trọng và tráng lệ nội thất bên trong. Thi công đầu năm 2021.",
        route: "chi-tiet-du-an/6264bf81f47761c9f6bfec7d",
        imageUrl: 'https://images.pexels.com/photos/1134175/pexels-photo-1134175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
        name: "Random Name #7",
        title: "Kiến trúc Biệt Thự Mái Thái- Xu hướng thiết kế 2021",
        description: "Vẽ đẹp bên ngoài của biệt thự 1 tầng với 4 mặt thoáng được KTS của NEOhouse phát họa nhìn hiện đại nhưng không kém phần mềm mại uyển chuyển bởi các phào chỉ nhấn nhẹ. Đây là một trong những dự án tiêu biểu của công ty trong tháng 06 này.",
        route: "chi-tiet-du-an/6264bf81f47761c9f6bfec7d",
        imageUrl: 'https://images.pexels.com/photos/5997996/pexels-photo-5997996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    }
]

const Header = () => {

    const navigate = useNavigate()
    const classes = useStyle()

    const { projectDetailsForShowHeader } = useSelector((state) => state.projectDetails)
    console.log('[projectDetailsForShowHeader]', projectDetailsForShowHeader)
    const handleViewDetail = (route) => {
        navigate(`/${route}`)
    }

    return (
        <Box className={classes.container}>
            <CarouselImage data={projectDetailsForShowHeader} onViewDetail={handleViewDetail} />
        </Box>
    )
}

export default Header