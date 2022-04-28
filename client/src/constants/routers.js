
export const routes = [
    {
        id: 1,
        name: 'Giới Thiêu',
        route: 'han-muc-du-an',
        child: [
            {
                id: 1,
                name: 'Danh Mục',
                // route: 'introduce',
                route: 'han-muc-du-an',
            },
            {
                id: 2,
                name: 'Nhân Sự',
                // route: 'introduce',
                route: 'han-muc-du-an',
            },
            {
                id: 3,
                name: 'Văn Phòng',
                // route: 'introduce',
                route: 'han-muc-du-an',
            },
            {
                id: 4,
                name: 'Liên Hệ',
                // route: 'introduce',
                route: 'han-muc-du-an',
            },
        ]
    },
    {
        id: 2,
        name: 'Khách sạn',
        route: 'han-muc-du-an/du-an/62643d69f47761c9f6bfec39',
        child: [

        ]
    },
    {
        id: 3,
        name: 'Biệt Thự',
        route: 'han-muc-du-an/du-an/62643d9ff47761c9f6bfec3b',
        child: [
            {
                id: 1,
                name: 'Biệt Thự Bán Cổ Điển',
                // route: 'villas',
                route: 'han-muc-du-an/chi-tiet-du-an/62643fdef47761c9f6bfec4e',
            },
            {
                id: 2,
                name: 'Biệt Thự Cổ Điển',
                // route: 'villas',
                route: 'han-muc-du-an/chi-tiet-du-an/6264400df47761c9f6bfec50',
            },
            {
                id: 3,
                name: 'Biệt Thự Hiện Đại',
                // route: 'villas',
                route: 'han-muc-du-an/chi-tiet-du-an/62644086f47761c9f6bfec52',
            },
            {
                id: 4,
                name: 'Biệt Thự Vườn-Mái Thái',
                // route: 'villas',
                route: 'han-muc-du-an/chi-tiet-du-an/62644102f47761c9f6bfec54',
            },
        ]
    },
    {
        id: 4,
        name: 'Nhà Phố',
        route: 'han-muc-du-an/du-an/62643dc6f47761c9f6bfec3d',
        child: [
            {
                id: 1,
                name: 'Nhà Phố Bán Cổ Điển',
                route: 'han-muc-du-an/chi-tiet-du-an/6267c5892cb5aa0379ee147f'
            },
            {
                id: 2,
                name: 'Nhà Phố Hiện Đại',
                route: 'han-muc-du-an/chi-tiet-du-an/6267c5f02cb5aa0379ee1481'
            },
            {
                id: 3,
                name: 'Nhà Phố 2 Tầng',
                route: 'han-muc-du-an/du-an/62643dc6f47761c9f6bfec3d'
            },
            {
                id: 4,
                name: 'Nhà Phố 3 Tầng',
                route: 'han-muc-du-an/du-an/62643dc6f47761c9f6bfec3d'
            },
        ]
    },
    {
        id: 5,
        name: 'Nội Thất',
        route: 'han-muc-du-an/du-an/62643dfbf47761c9f6bfec3f',
        child: [
            {
                id: 1,
                name: 'Nội Thất Bán Cổ Điển',
                route: 'han-muc-du-an/chi-tiet-du-an/62644147f47761c9f6bfec56'
            },
            {
                id: 2,
                name: 'Nội Thất Cổ Điển',
                route: 'han-muc-du-an/chi-tiet-du-an/6264416ef47761c9f6bfec58'
            },
            {
                id: 3,
                name: 'Nội Thất Hiện Đại',
                route: 'han-muc-du-an/chi-tiet-du-an/6264419df47761c9f6bfec5a'
            },
        ]
    },
    {
        id: 6,
        name: 'Thi Công',
        route: 'han-muc-du-an/du-an/62643e37f47761c9f6bfec42',
        child: [
            {
                id: 1,
                name: 'Thi Công Kiến Trúc',
                route: 'han-muc-du-an/chi-tiet-du-an/62644235f47761c9f6bfec5c'
            },
            {
                id: 2,
                name: 'Thi Công Nội Thất',
                route: 'han-muc-du-an/chi-tiet-du-an/62644275f47761c9f6bfec5e'
            },
        ]
    },
];
