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
    },
    buttonWrapper: {
        position: "absolute",
        height: "100px",
        backgroundColor: "transparent",
        top: "calc(50% - 70px)",
        '&:hover': {
            '& $button': {
                backgroundColor: "black",
                filter: "brightness(120%)",
                opacity: "0.4"
            }
        }
    },
    fullHeightHoverWrapper: {
        height: "100%",
        top: "0"
    },
    buttonVisible: {
        opacity: "1"
    },
    buttonHidden: {
        opacity: "0",
    },
    button: {
        margin: "0 10px",
        position: "relative",
        backgroundColor: "#494949",
        top: "calc(50% - 20px) !important",
        color: "white",
        fontSize: "30px",
        transition: "200ms",
        cursor: "pointer",
        '&:hover': {
            opacity: "0.6 !important"
        },
    },
    // Applies to the "next" button wrapper
    next: {
        right: 0
    },
    // Applies to the "prev" button wrapper
    prev: {
        left: 0
    },
    indicators: {
        width: "100%",
        marginTop: "10px",
        textAlign: "center"
    },
    indicator: {
        cursor: "pointer",
        transition: "200ms",
        padding: 0,
        color: "#afafaf",
        '&:hover': {
            color: "#1f1f1f"
        },
        '&:active': {
            color: "#1f1f1f"
        }
    },
    indicatorIcon: {
        fontSize: "15px",
    },
    // Applies to the active indicator
    active: {
        color: "#494949"
    }
}))