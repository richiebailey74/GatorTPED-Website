import React from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from './styles';

//exportable used for display on other parts of the website (project post page)
const Posts = ({ setCurrentId }) => {
  //defines consts used for interactable asepcts of the exportable (what is returned for display)
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  //this is the actual styling and combination of interactable functionality
  return (
     
    //checks to see if the posts defined has a length, if not the .map can't be called without error so it display nothing
    //if there is a length, then the map will display the items in posts
    !posts.length ? <Grid></Grid> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
