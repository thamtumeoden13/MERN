import React, { useEffect, useState } from 'react'; import {
    Link as RouterLink,
    Route,
    Routes,
    MemoryRouter,
    useLocation,
    useNavigate,
} from 'react-router-dom';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

const BreadcrumbComponent = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const [pathnames, setPathnames] = useState([])

    useEffect(() => {
        const pathnames = location.pathname.split('/').filter((x) => x);
        if (!!pathnames) {
            const pathnamesModifier = pathnames.map(pathname => {
                let name
                switch (pathname.toLowerCase()) {
                    case 'han-muc-du-an':
                        name = 'Hạn Mục Dự Án'
                        break;
                    case 'du-an':
                        name = 'Dự Án'
                        break;
                    case 'chi-tiet-du-an':
                        name = 'Chi Tiết Dự Án'
                        break;
                    default:
                        name = pathname
                        break;
                }

                return {
                    name: name,
                    value: pathname,
                }
            })
            console.log('[pathnames]', pathnames)
            console.log('[pathnamesModifier]', pathnamesModifier)
            setPathnames(pathnamesModifier)
        }
    }, [location])

    const handleClick = (to) => {
        console.log('You clicked a breadcrumb.', to);
        navigate(to)
    }

    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href={``} onClick={() => handleClick("/")}>
                <Typography color="primary">  {`Trang chủ`}  </Typography>
            </Link>
            {pathnames.map((pathname, index) => {
                const last = index === pathnames.length - 1;
                const toPathnames = pathnames.slice(0, index + 1);
                const to = toPathnames.map(e => e.value).join('/')
                return (
                    <Box key={to}>
                        {
                            last ? (
                                <Typography color="text.primary">{pathname.name}</Typography>
                            ) : (
                                <Link underline="hover" color="inherit"
                                    key={to} href={``}
                                    onClick={() => handleClick(`/${to}`)}
                                >
                                    <Typography color="primary"> {pathname.name} </Typography>
                                </Link>
                            )
                        }
                    </Box>
                )
            })}
        </Breadcrumbs>
    );
}

export default BreadcrumbComponent