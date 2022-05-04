import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    cardContainer: {
        transition: `all 0.5s ease-in-out`,
        color: 'white',
        '&:hover': {
            transform: `scale(1.03)`,
            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
            color: 'orangered',
        },
        cursor: 'pointer',
    },
    cardContent: {
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
    },
}))