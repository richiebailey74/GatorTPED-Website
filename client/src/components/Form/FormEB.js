import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { createPostEB, updatePostEB } from '../../actions/postsEB';
import { makeStyles } from '@material-ui/core/styles';

//this the styling used for the form used for e-board posts using u-styles in CSS
//used in the exportable to be displayable on other pages
//will only be viewable to the admin
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: 'transparent',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
  fileInput: {
    width: '97%',
    margin: '10px 0',
    color: 'white',
  },
  buttonSubmit: {
    backgroundColor: 'orange',
    marginBottom: 10,
  },
}));

//the exportable form to other files to use and display on other pages
  const FormEB = ({ currentId, setCurrentId }) => {
    //defines constants used in the exportable
    const [postDataEB, setPostDataEB] = useState({ name: '', position: '', aboutMe: '', classOf: '', major: '', creator: '', picture: '' });
    const postEB = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
  
    //essentially puts the data from the text fields in the form into the exportable data to be used in e-board member posts to the e-board page
    useEffect(() => {
      if (postEB) setPostDataEB(postEB);
    }, [postEB]);
  
    //used to clear and set to empty strings the text fields on the form
    const clear = () => {
      setCurrentId(0);
      setPostDataEB({ name: '', position: '', aboutMe: '', classOf: '', major: '', creator: '', picture: '' });
    };
  
    //function for if an event e occurs on the form, utilizing built-in handleSubmit in react to create or edit e-board posts
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (currentId === 0) {
        dispatch(createPostEB({ ...postDataEB, name: user?.result?.name }));
        clear();
      } else {
        dispatch(updatePostEB(currentId, { ...postDataEB, name: user?.result?.name }));
        clear();
      }
    };

    //the actual returned form with interactable buttons and text fields for data to be used in the form to be put into posts
    return (
        //at the outermost part of the form, must make only visible to users of type isAdmin === true
      <Paper className={classes.paper} elevation={0}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography style={{ color: 'white' }} variant="h6">{currentId ? `Editing "${postEB.name}"` : 'Add an E-Board Member'}</Typography>
          <TextField name="name" variant="outlined" label="Name" fullWidth value={postDataEB.name} onChange={(e) => setPostDataEB({ ...postDataEB, name: e.target.value })} />
          <TextField name="position" variant="outlined" label="Club Position" fullWidth value={postDataEB.position} onChange={(e) => setPostDataEB({ ...postDataEB, position: e.target.value })} />
          <TextField name="aboutMe" variant="outlined" label="About Me" fullWidth multiline rows={5} value={postDataEB.aboutMe} onChange={(e) => setPostDataEB({ ...postDataEB, aboutMe: e.target.value })} />
          <TextField name="classOf" variant="outlined" label="Class of" fullWidth value={postDataEB.classOf} onChange={(e) => setPostDataEB({ ...postDataEB, classOf: e.target.value })} />
          <TextField name="major" variant="outlined" label="Major" fullWidth value={postDataEB.major} onChange={(e) => setPostDataEB({ ...postDataEB, major: e.target.value })} />
          <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostDataEB({ ...postDataEB, picture: base64 })} /></div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </form>
      </Paper>
    );
  };
  
  export default FormEB;
