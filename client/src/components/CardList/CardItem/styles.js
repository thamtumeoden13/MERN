import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    cardContainer: {
        display: 'flex', flexDirection: 'column',
        //  maxWidth: 345,
        // [theme.breakpoints.up('sm')]: {
        //     maxWidth: 256
        // },
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
    cardContent: {
        display: 'flex', flexDirection: 'column', height: 100, overflow: 'hidden'
    },
    cardActions: {
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: 50
    }
}))