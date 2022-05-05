import { makeStyles } from '@mui/styles';
import { deepPurple } from '@mui/material/colors';

export default makeStyles((theme) => ({
	appBar: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 0,
		flex: 1,
		backgroundColor: '#202530',
	},
	toolbar: {
		display: 'flex',
		// justifyContent: 'space-between',
		flex: 1,
		[theme.breakpoints.down('md')]: {
			width: 'auto',
		},
		[theme.breakpoints.down('sm')]: {
			width: 'auto',
		},
	}
}));