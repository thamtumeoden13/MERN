
export const routes = [
    {
        id: 1,
        name: 'Giới Thiêu',
        // route: 'introduce',
        child: [
            {
                id: 1,
                name: 'Danh Mục',
                // route: 'introduce',
                route: 'products',
            },
            {
                id: 2,
                name: 'Nhân Sự',
                // route: 'introduce',
                route: 'products',
            },
            {
                id: 3,
                name: 'Văn Phòng',
                // route: 'introduce',
                route: 'products',
            },
            {
                id: 4,
                name: 'Liên Hệ',
                // route: 'introduce',
                route: 'products',
            },
        ]
    },
    {
        id: 2,
        name: 'Khách sạn',
        // route: 'hotels',
        route: 'albums',
        child: [

        ]
    },
    {
        id: 3,
        name: 'Biệt Thự',
        // route: 'villas',
        child: [
            {
                id: 1,
                name: 'Biệt Thự Bán Cổ Điển',
                // route: 'villas',
                route: 'tours',
            },
            {
                id: 2,
                name: 'Biệt Thự Cổ Điển',
                // route: 'villas',
                route: 'tours',
            },
            {
                id: 3,
                name: 'Biệt Thự Hiện Đại',
                // route: 'villas',
                route: 'tours',
            },
            {
                id: 4,
                name: 'Biệt Thự Vườn-Mái Thái',
                // route: 'villas',
                route: 'tours',
            },
        ]
    },
    {
        id: 4,
        name: 'Nhà Phố',
        // route: 'townhouses',
        child: [
            {
                id: 1,
                name: 'Nhà Phố Bán Cổ Điển',
                route: 'townhouses'
            },
            {
                id: 2,
                name: 'Nhà Phố Cổ Điển',
                route: 'townhouses'
            },
            {
                id: 3,
                name: 'Nhà Phố 2 Tầng',
                route: 'townhouses'
            },
            {
                id: 4,
                name: 'Nhà Phố 3 Tầng',
                route: 'townhouses'
            },
        ]
    },
    {
        id: 5,
        name: 'Nội Thất',
        // route: 'furnitures',
        child: [
            {
                id: 1,
                name: 'Nội Thất Bán Cổ Điển',
                route: 'furnitures'
            },
            {
                id: 2,
                name: 'Nội Thất Cổ Điển',
                route: 'furnitures'
            },
            {
                id: 3,
                name: 'Nội Thất Hiện Đại',
                route: 'furnitures'
            },
        ]
    },
    {
        id: 6,
        name: 'Thi Công',
        // route: 'constructions',
        child: [
            {
                id: 1,
                name: 'Thi Công Kiến Trúc',
                route: 'constructions'
            },
            {
                id: 2,
                name: 'Thi Công Nội Thất',
                route: 'constructions'
            },
        ]
    },
];
