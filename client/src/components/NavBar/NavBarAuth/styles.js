import { makeStyles } from '@mui/styles';
import { deepPurple } from '@mui/material/colors';

export default makeStyles((theme) => ({
	appBar: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: '#202530',
		[theme.breakpoints.down('sm')]: {
			padding: 0
		},
		[theme.breakpoints.down('md')]: {
			padding: 0
		},
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'space-between',
		flex: 1,
		[theme.breakpoints.down('md')]: {
			width: 'auto',
		},
		[theme.breakpoints.down('sm')]: {
			width: 'auto',
		},
	},
}));