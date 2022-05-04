import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
	menu: {
		color: 'white',
		display: 'flex',
		borderRadius: '0',
		"&:hover": {
			background: 'linear-gradient(45deg, #f37121 30%, #f37121 100%)',
			boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
		},
	}
}));