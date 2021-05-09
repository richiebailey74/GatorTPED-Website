import { makeStyles } from '@material-ui/core/styles';

//this is the stlying immported in Auth.js in the same directory used for the login/signup page for user authentication
//this uses u-styles in CSS
export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: 'transparent',
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'orange',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
    '& label.Mui-focused': {
      color: 'orange',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'orange',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
        borderRadius: 50,
      },
      '&:hover fieldset': {
        borderColor: 'navy',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'orange',
      },
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: 'orange',
    borderRadius: 50,
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  },
}));