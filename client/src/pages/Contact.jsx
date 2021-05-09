import React, { useState } from "react";
import axios from "axios";

//material ui imports
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

//copyright function essentially displays the copyright logo with gatorTPED and current year to the page
function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="/">
          GatorTPED
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

//styling used later on in the exportable by using u-styles in CSS
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(3, 0, 1),
        backgroundColor: 'orange',
    },
    form: {
        width: '90%',
        marginTop: theme.spacing(0),
        color: 'white',
        '& .MuiInputBase-input': {
            color: 'white',
          },
        '& label.Mui-focused': {
            color: 'orange',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'orange',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
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
        margin: theme.spacing(2, 0, 3),
        backgroundColor: 'orange'
    },
    grid: {
        margin: theme.spacing(0,0,3)
    },
    text: {
      color: 'white'
    },
    bgpaper: {
      display: 'flex',
      flex: '1',
      '& > *': {
        margin: theme.spacing(0),
      },
    }
}));

//exportable for the contact us subpage
const Contact = () => {

    //defines consts used for functionality in the functions and the returned part of the exportable
    const classes = useStyles();
    const [result, setResult] = useState(null);

    //blank state for the values inserted into the email/message sent by the viewer/user filling out the form
    const [state, setState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    
    //function sends the email message to the attached admin email to backend
    const sendEmail = event => {

        event.preventDefault();
        
        //uses different axios function definitions for different situations with regards to sent message
        axios
            .post('/send', { ...state })
            .then(response => {
                setResult(response.data);
                setState({ name: '', email: '', subject: '', message: '' });
            })
            .catch(() => {
                setResult({ success: false, message: 'Something went wrong. Try again later'});
            });
    };
    
    //function changes the input on the form
    const onInputChange = event => {

        const { name, value } = event.target;
    
        setState({
          ...state,
          [name]: value
        });
    };

    //the actual returned styling with embedded functionality for the exportable
    return (
        
        //creates the contact us form with the corresponding and appropriate text fields with limits on size sent by viewer.user
        //clears the form once the message is sent
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
            <Container component="main" maxWidth="sm">
                <div className={classes.bgpaper}>
                    <Paper style={{ backgroundColor: 'transparent', }} elevation={0}>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <ContactMailIcon />
                            </Avatar>
                            <Typography style={{ color: 'white', }} component="h1" variant="h5">
                                Contact Us
                            </Typography>
                            {result && (
                                <p className={`${result.success ? 'success' : 'error'}`}>
                                {result.message}
                                </p>
                            )}
                            <form className={classes.form} onSubmit={sendEmail}>

                                <TextField
                                    type="name"
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    autofocus
                                    fullWidth
                                    name="name"
                                    label="Name"
                                    placeholder="Enter your full name"
                                    value={state.name}
                                    onChange={onInputChange}
                                />
                                <TextField
                                    type="email"
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    autofocus
                                    fullWidth
                                    label="Email Address"
                                    placeholder="Enter your email address"
                                    name="email"
                                    value={state.email}
                                    onChange={onInputChange}
                                />
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    autofocus
                                    fullWidth
                                    label="Subject"
                                    placeholder="Enter message subject"
                                    name="subject"
                                    value={state.subject}
                                    onChange={onInputChange}
                                />
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    autofocus
                                    fullWidth
                                    label="Message"
                                    placeholder="What would you like to say to us?"
                                    name="message"
                                    multiline
                                    rows="6"
                                    rowsMax={10}
                                    value={state.message}
                                    onChange={onInputChange}
                                />
                                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </Paper>
                </div>
                <Box mt={2}>
                    <Copyright />
                </Box>
            </Container>
        </div>
    )
}

export default Contact;