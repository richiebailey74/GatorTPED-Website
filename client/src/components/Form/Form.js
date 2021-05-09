import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { createPost, updatePost } from '../../actions/posts';
import { makeStyles } from '@material-ui/core/styles';

//this the styling used for the form used for the project submission using u-styles in CSS
//used in the exportable to be displayable on other pages
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
  },
  buttonSubmit: {
    backgroundColor: 'orange',
    marginBottom: 10,
  },
}));

//the exportable form to other files to use and display on other pages
  const Form = ({ currentId, setCurrentId }) => {
    //defines constants used in the exportable
    const [postData, setPostData] = useState({ title: '', message: '', major: '', selectedFile: '' });
    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
  
    //essentially puts the data from the text fields in the form into the exportable data to be used in posts
    useEffect(() => {
      if (post) setPostData(post);
    }, [post]);
  
    //used to clear and set to empty strings the text fields on the form
    const clear = () => {
      setCurrentId(0);
      setPostData({ title: '', message: '', major: '', selectedFile: '' });
    };
  
    //function for if an event e occurs on the form, utilizing built-in handleSubmit in react to create or edit posts
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (currentId === 0) {
        dispatch(createPost({ ...postData, name: user?.result?.name }));
        clear();
      } else {
        dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        clear();
      }
    };
  
    //the actual returned form with interactable buttons and text fields for data to be used in the form to be put into posts
    return (
      <Paper className={classes.paper} elevation={0}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography style={{ color: 'white'}} variant="h6">{currentId ? `Editing "${post.title}"` : 'Post Your Project'}</Typography>
          <TextField name="title" variant="outlined" label="Project Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
          <TextField name="major" variant="outlined" label="Major" fullWidth value={postData.major} onChange={(e) => setPostData({ ...postData, major: e.target.value })} />
          <TextField name="message" variant="outlined" label="Project Description" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
          <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          <Button variant="contained" color="navy" size="small" onClick={clear} fullWidth>Clear</Button>
        </form>
      </Paper>
    );
  };
  
  export default Form;
