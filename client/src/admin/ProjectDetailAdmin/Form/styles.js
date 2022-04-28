import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1)
        }
    },
    paper: {
        padding: theme.spacing(2),
    },
    paperAction: {
        display: 'flex',
        flexDirection: 'column',
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    fileInput: {
        width: '97%',
        margin: '10px 0',
        padding: '10px 0 10px 10px'
    },
    errorFileInput: {
        width: '100%', padding: '0 10px',
        color: '#dc5a5b', fontSize: '0.7em', marginBottom: '10px',
    },
    buttonSubmit: {
        marginRight: 8,
    },
    buttonClear: {
        marginLeft: 8,
    }
}))