import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    container: {
        paddingLeft: 4, paddingRight: 4,
        maxWidth: '100%', overflow: 'auto'
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        paddingBottom: 10,
    },
}))