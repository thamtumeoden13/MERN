import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    media: {
        borderRadius: '20px',
        objectFit: 'cover',
        width: '100%',
        maxHeight: '600px',

    },
    card: {
        display: 'flex',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
            flexDirection: 'column',
        },
    },
    section: {
        borderRadius: '20px',
        margin: '10px',
        flex: 1,
    },
    imageSection: {
        marginLeft: '20px',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
    },
    commentsOuterContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    commentsInnerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '200px',
        overflowY: 'auto',
        marginRight: 30,
    },
    recommendedOuterPosts: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    recommendedInnerPosts: {
        display: 'flex',
        overflowX: 'auto',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            overflowY: 'auto',
        },
    },
    loadingPaper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '15px',
        height: '39vh',
    },
}));