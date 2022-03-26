import { makeStyles } from '@mui/styles';
import { deepPurple } from '@mui/material/colors';
import { alpha, styled } from '@mui/material/styles';

export default makeStyles((theme) => ({
	appBar: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '10px 50px',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
		},
		backgroundColor: '#202530'
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
		// width: '400px',
		flex: 1,
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
	signin: {
		marginLeft: '20px',
		background: 'linear-gradient(45deg, #56BBF1 30%, #4D77FF 90%)'
	},
	logout: {
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		marginLeft: '20px',
	},
	userName: {
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center',
		color: 'white'
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
	menu: {
		color: 'white',
		display: 'flex',
		"&:hover": {
			background: 'linear-gradient(45deg, #56BBF1 30%, #4D77FF 90%)',
			boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)'
		},
	}
}));