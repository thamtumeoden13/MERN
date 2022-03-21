import { makeStyles } from '@mui/styles';
import { deepPurple } from '@mui/material/colors';

export default makeStyles((theme) => ({
	appBar: {
		borderRadius: 15,
		margin: '30px 0',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '10px 50px',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
		},
		backgroundColor: '#f5ef33'
	},
	heading: {
		color: theme.palette.primary.main,
		textDecoration: 'none',
		fontSize: '2em',
		fontWeight: 300,
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'flex-end',
		width: '400px',
		[theme.breakpoints.down('md')]: {
			width: 'auto',
		},
		[theme.breakpoints.down('sm')]: {
			width: 'auto',
		},
	},
	profile: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '400px',
		alignItems: 'center',
		[theme.breakpoints.down('md')]: {
			width: 'auto',
			justifyContent: 'center',
		},
		[theme.breakpoints.down('sm')]: {
			width: 'auto',
			marginTop: 20,
			justifyContent: 'center',
		},
	},
	logout: {
		marginLeft: '20px',
	},
	userName: {
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center',
	},
	brandContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	imageLogo: { padding: '2px', width: '64px', height: '64px' },
	imageBackground: {
		marginLeft: '10px',
		marginTop: '5px',
	},
	purple: {
		color: theme.palette.getContrastText(deepPurple[500]),
		backgroundColor: deepPurple[500],
		margin: '0 10px'
	},
}));