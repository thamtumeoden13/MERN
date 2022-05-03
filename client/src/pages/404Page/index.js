import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
// components
import Page from '../../components/common/Page';
import { useTitle } from '../../utils';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    // justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

const Page404 = () => {

    useTitle('Art-Sunday | 404 Not Found');

    return (
        <Page title="404 Page Not Found">
            <Container>
                <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
                    <Typography variant="h3" paragraph>
                        {`Sorry, page not found!`}
                    </Typography>

                    <Typography sx={{ color: 'text.secondary' }}>
                        {`Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
                        sure to check your spelling.`}
                    </Typography>

                    <Box
                        component="img"
                        src="http://localhost:3000/surr-404.png"
                        sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
                    />

                    <Button to="/" size="large" variant="contained" component={RouterLink}>
                        {`Go to Home`}
                    </Button>
                </ContentStyle>
            </Container>
        </Page>
    );
}

export default Page404