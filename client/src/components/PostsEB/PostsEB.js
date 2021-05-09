import React from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import PostEB from './PostEB/PostEB';
import useStyles from './styles';

//exportable used for display on other parts of the website (executive board page)
const PostsEB = ({ setCurrentId }) => {
  //defines consts used for interactable asepcts of the exportable (what is returned for display)
  const postsEB = useSelector((state) => state.postsEB);
  const classes = useStyles();

  //this is the actual styling and combination of interactable functionality
  return (
    
    //checks to see if the posts defined has a length, if not the .map can't be called without error so it display nothing
    //if there is a length, then the map will display the items in posts
    !postsEB.length ? <Grid></Grid> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {postsEB.map((postEB) => (
          <Grid key={postEB._id} item xs={20} sm={16} md={12}>
            <PostEB postEB={postEB} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default PostsEB;
