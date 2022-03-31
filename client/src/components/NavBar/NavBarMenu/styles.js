import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
	menu: {
		color: 'white',
		display: 'flex',
		"&:hover": {
			background: 'linear-gradient(45deg, #56BBF1 30%, #4D77FF 90%)',
			boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)'
		},
	}
}));