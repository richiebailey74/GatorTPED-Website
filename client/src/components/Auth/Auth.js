import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { signin, signup } from '../../actions/auth';
import useStyles from './styles';
import Input from './Input';

//defines the initial state for the schema for user to be used in the exportable
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', major: '', gradYear: '', clubPosition: '' };

//this is the exportable that will be used for display on the user authentication page for login or signup
const SignUp = () => {
  //defines constants used in the exportable for functionality
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  //this const function is used to reset the login or signup form if the redirect is used to switch between the forms
  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  //this const function takes in an event e to determine whether or not the signup or signin should be dispatched
  const handleSubmit = (e) => {
    e.preventDefault();

    //checks isSignup const from useState to decide what function to dispatch
    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  //the actual styling exported
  return (

    //it is displayed with its corresponding functionality for signin or signup, depending on which because the display changes accordingly
    <div style={{ position: 'absolute', left: '50%', top: '40%', transform: 'translate(-50%, -50%)'}}>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={0}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography style={{ color: 'white', }} component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              { isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
              )}
              <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
              <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
              { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              { isSignup ? 'Sign Up' : 'Sign In' }
            </Button>
            <Grid container justify="center">
              <Grid item>
                <Button style={{ color: 'white', }} onClick={switchMode}>
                  { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default SignUp;