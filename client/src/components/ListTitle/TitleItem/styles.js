import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // maxWidth: 345,
        // [theme.breakpoints.up('sm')]: {
        //     maxWidth: 256
        // },
        transition: `all 0.5s ease-in-out`,
        border: '1px solid rgba(0,0,0,0.1)',
        '&:hover': {
            transform: `scale(1.03)`,
            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
            color: 'orangered'
        },
        cursor: 'pointer',
        marginRight: 10,
        minWidth: 120,
        borderRadius: 4,
        height: 40,
        backgroundColor: 'white',
        padding:'0 8px',
    },
    cardContent: {
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
    },
}))