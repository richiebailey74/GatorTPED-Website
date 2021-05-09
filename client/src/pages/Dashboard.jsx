import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { updateProfile } from '../actions/auth';
import Input from './Input';
import DashboardInfo from './DashboardInfo';
import dashboardImage from './dashboard.jpg';
import editProfileImage from './editProfile.jpg';

//this is the stlying that is used in the exportable using u-styles in CSS
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    color: 'white',
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
    '& .MuiInputBase-input': {
        color: 'black',
        backgroundColor: 'white',
        borderRadius: 50,
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
}));

//this const initial state is defined to be the default values for the edit profile page (called dashboard) for the edit profile form
const initialState = { firstName: '', lastName: '', email: '', password: '', major: '', gradYear: '', clubPosition: '' };

//exportable containing styling and functionality to allow users to change information about their profile
//also viewable subpage for users and admins
const Dashboard = () => {

  //defines consts used in the funcions and returned part of the exportable
  const [form, setForm] = useState(initialState);
  var [user] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  //takes the event e and prevents the default associated with the event and then dispatches the updateProfile function so information can be changed in the backend
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(form, history));
    e.target.reset();
  };

  //defines the handleChange with the event e
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  //returned part of the exportable tht includes stlying and embedded functionality
  return (
    
    //displays the logged-in users current information
    <div>
      <div style={{ position: 'absolute', left: '33%', top: '50%', transform: 'translate(-50%, -50%)'}}>
      <Container component="main" maxWidth="sm">
        <Paper style={{ backgroundImage: `url(${dashboardImage})`, backgroundSize: 'cover', }} className={classes.paper} elevation={3}>
          <Typography component="h1" variant="h5"> Dashboard </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <DashboardInfo name="name" label={user?.result.name} />
                <DashboardInfo name="email" label={user?.result.email} />
                <DashboardInfo name="major" label={user?.result.major}  half />
                <DashboardInfo name="gradYear" label={user?.result.gradYear}  half />
                <DashboardInfo name="clubPosition" label={user?.result.clubPosition}  />
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>

    {/* displays a form that allows users to change the information associated with their account (not email or password
      but they must log out and log back in to view the changed information to the information display) */}
    <div style={{ position: 'absolute', left: '67%', top: '50%', transform: 'translate(-50%, -50%)'}}>
        <Container component="main" maxWidth="sm">
          <Paper style={{ backgroundImage: `url(${editProfileImage})`, backgroundSize: 'cover', }} className={classes.paper} elevation={3}>
            <Typography component="h1" variant="h5"> Edit Profile </Typography>
            <Typography component="b1" variant="b5"> (Once applied, please logout and login again to see account changes) </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                <Input name="email" label="Email Address (do not change account email)" handleChange={handleChange} type="email" />
                <Input name="password" label="Password (used for verifying changes)" handleChange={handleChange} type="password"/>
                <Input name="major" label="Major" handleChange={handleChange} half />
                <Input name="gradYear" label="Graduation Year" handleChange={handleChange} half />
                <Input name="clubPosition" label="Club Position (Future Member/Member/Officer)" handleChange={handleChange} />

              </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Confirm Changes
              </Button>
            </form>
          </Paper>
        </Container>
      </div>
    </div>
  );
};


export default Dashboard;
