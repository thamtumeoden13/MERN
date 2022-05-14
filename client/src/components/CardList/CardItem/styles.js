import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 345,
        maxHeight: 324,
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            maxHeight: '100%',
            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)'
        },
        transition: `all 0.5s ease-in-out`,
        '&:hover': {
            transform: `scale(1.03)`,
            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)'
        },
        cursor: 'pointer',
    },
    card: {
        display: 'flex', flexDirection: 'column'
    },
    cardImage: {
        height: 244,
        [theme.breakpoints.down('sm')]: {
            height: 'auto',
        },
    },
    cardContent: {
        display: 'flex', flexDirection: 'column', height: 80,
        [theme.breakpoints.down('sm')]: {
            height: 'auto',
        },
        overflow: 'hidden',
    },
}))