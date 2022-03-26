import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    container: {
        height: '50vh',
        display: 'flex',
        alignItems: 'center'
    },
    carousel: {
        width: '100%',
        height: '100vh',
    },
    carouselPaper: {
        display: 'flex',
        flexDirection: 'column',
        height: '95vh'
    },
    image: {
        objectFit: 'cover',
        width: '100%',
        height: '100%'
    }
}))