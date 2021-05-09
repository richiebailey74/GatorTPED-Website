import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPosts } from '../actions/posts';
import Form from '../components/Form/Form';

//this is the exportable for submitting a project post to the projects subpage
const SubmitPost = () => {

  //defines the consts used in the exportable
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  //this function dispatches the getPosts() function which is used to receive and display all project posts
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  //displays the form to the user from which the user can fill out to submit projects to be displayed on the display page
  return (
    <Grow in>
      <Container>
        <Grid container justify="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={4} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default SubmitPost;


