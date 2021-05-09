import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { getPosts } from '../actions/posts';
import Posts from '../components/Posts/Posts';

//this is the stlying used for the project display subpage on the website
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    left: 0,
    top: '20%',
    zIndex: 10,
  },
  gridContainer: {
    paddingTop: "125px"
  }
}));

//this is the exportable for the project display to be displayed on the projects subpage on the website
const ProjectSearch = () => {

    //defines all of the consts used in the exportable
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const classes = useStyles();

    //this function dispatches the getPosts() function to be used on the returned part of the exportable
    useEffect(() => {
      dispatch(getPosts());
    }, [currentId, dispatch]);

    //this is the returned part of the exportable which is what is actually displayed to the website with the embedded functionality of displaying posts to the page
      return (
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
            <Grid item xs={12} className={classes.gridContainer}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      )
};
export default ProjectSearch;

