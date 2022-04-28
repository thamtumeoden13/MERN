import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

import Copyright from '../components/CopyRight'
import { useNavigate } from 'react-router-dom';

const tiers = [
    {
        title: 'Hạn Mục Dự Án',
        subheader: '',
        price: '0',
        description: [
            '10 users included',
            '2 GB of storage',
            'Help center access',
            'Email support',
        ],
        image: 'http://localhost:3000/images/portfolios/4.jpeg',
        route: 'quan-ly/han-muc-du-an',
        buttonText: 'Get started',
        buttonVariant: 'contained',
    },
    {
        title: 'Dự Án',
        subheader: '',
        price: '15',
        description: [
            '20 users included',
            '10 GB of storage',
            'Help center access',
            'Priority email support',
        ],
        image: 'http://localhost:3000/images/projects/4.jpeg',
        route: 'quan-ly/du-an',
        buttonText: 'Get started',
        buttonVariant: 'contained',
    },
    {
        title: 'Chi Tiết Dự Án',
        subheader: '',
        price: '30',
        description: [
            '50 users included',
            '30 GB of storage',
            'Help center access',
            'Phone & email support',
        ],
        image: 'http://localhost:3000/images/projectDetails/4.jpeg',
        route: 'quan-ly/chi-tiet-du-an',
        buttonText: 'Get started',
        buttonVariant: 'contained',
    },
];

const PricingContent = () => {
    const navigate = useNavigate()

    const handleClick = (tier) => {
        navigate(`/${tier.route}`)
    }
    return (
        <React.Fragment>
            <Container disableGutters maxWidth="sm" component="main" sx={{ mt: 5, pt: 8, pb: 6 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    {`TRANG QUẢN LÝ`}
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" component="p">
                    {`Trang này để quản lý nội dụng của website`}
                </Typography>
            </Container>
            <Container maxWidth="md" component="main" sx={{ mb: 10 }} >
                <Grid container spacing={5} alignItems="flex-end">
                    {tiers.map((tier) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid
                            item
                            key={tier.title}
                            xs={12}
                            sm={tier.title === 'Enterprise' ? 12 : 6}
                            md={4}
                        >
                            <Card>
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    action={tier.title === 'Pro' ? <StarIcon /> : null}
                                    subheaderTypographyProps={{
                                        align: 'center',
                                    }}
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'light'
                                                ? theme.palette.grey[200]
                                                : theme.palette.grey[700],
                                    }}
                                />
                                <CardMedia
                                    image={tier.image}
                                    title="title"
                                    sx={{ height: 150, }}
                                // className={classes.media}
                                />
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'baseline',
                                            mb: 2,
                                        }}
                                    >
                                        <Typography component="h2" variant="h3" color="text.primary">
                                            ${tier.price}
                                        </Typography>
                                        <Typography variant="h6" color="text.secondary">
                                            /mo
                                        </Typography>
                                    </Box>
                                </CardContent>
                                <CardActions>
                                    <Button fullWidth variant={tier.buttonVariant} onClick={() => handleClick(tier)}>
                                        {tier.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default function Pricing() {
    return <PricingContent />;
}