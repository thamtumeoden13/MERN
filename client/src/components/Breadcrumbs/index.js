import * as React from 'react'; import {
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
    const pathnames = location.pathname.split('/').filter((x) => x);
    console.log('[pathnames]', pathnames)

    const handleClick = (to) => {
        console.info('You clicked a breadcrumb.', to);
        navigate(to)
    }

    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href={``} onClick={() => handleClick("/")}>
                <Typography color="primary">  {`Trang chủ`}  </Typography>
            </Link>
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `${pathnames.slice(0, index + 1).join('/')}`;
                return (
                    <Box key={to}>
                        {
                            last ? (
                                <Typography color="text.primary">{value}</Typography>
                            ) : (
                                <Link underline="hover" color="inherit"
                                    key={to} href={``}
                                    onClick={() => handleClick(`/${to}`)}
                                >
                                    <Typography color="primary"> {value} </Typography>
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