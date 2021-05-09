import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { getPostsEB } from '../actions/postsEB';
import PostsEB from '../components/PostsEB/PostsEB';
import FormEB from '../components/Form/FormEB';

//this is the styling used later on in the exportable using u-styles in CSS
const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    left: 0,
    top: '20%',
    zIndex: 10,
  },
  gridContainer: {
    paddingTop: "100px"
  }
}));

//this is the EBoard exportable that is actually displayed on the edit profile subpage of the website
const EBoard = () => {

  //define the consts used in the exportable
  const [user] = useState(JSON.parse(localStorage.getItem('profile')));
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const isAdmin = user?.result.isAdmin;
  const classes = useStyles();

  //this function dispatches the function that gets all of the executive board members to display on the website
  useEffect(() => {
    dispatch(getPostsEB());
  }, [currentId, dispatch]);

  return (
    //if the user is an admit then display the executive board members and the form to post them as well as the button to delete them
    //if not an admin then it just shows the executive board members
    isAdmin ? (
      <Grow in>
        <Container>
          <Grid container justify="center" alignItems="stretch" spacing={3} className={classes.gridContainer}>
            <Grid item xs={8}>
              <PostsEB setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={8} >
              <FormEB currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    ) : (
      <Grow in>
      <Container>
        <Grid container justify="center" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={8}>
            <PostsEB setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
    )
  );
};

export default EBoard;