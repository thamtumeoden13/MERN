import { makeStyles } from '@mui/styles';
import { deepPurple } from '@mui/material/colors';

export default makeStyles((theme) => ({
	profile: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
		[theme.breakpoints.down('md')]: {
			width: 'auto',
			justifyContent: 'center',
		},
		[theme.breakpoints.down('sm')]: {
			width: 'auto',
			justifyContent: 'center',
		},
	},
	signin: {
		margin: '0 10px',
		background: 'linear-gradient(45deg, #56BBF1 30%, #4D77FF 90%)',
		[theme.breakpoints.down('md')]: {
			padding: '10px 0',
		},
		[theme.breakpoints.down('sm')]: {
			padding: '5px 5px'
		},
	},
	logout: {
		margin: '0 10px',
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		[theme.breakpoints.down('md')]: {
			padding: '10px 0',
		},
		[theme.breakpoints.down('sm')]: {
			padding: '5px 5px',
		},
	},
	userName: {
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center',
		color: 'white',
		margin: '0 10px',
	},
	purple: {
		color: theme.palette.getContrastText(deepPurple[500]),
		backgroundColor: deepPurple[500],
		margin: '0 10px'
	},
}));