import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarIcon from '@material-ui/icons/Star';
import { deletePost, switchFeatured } from '../../../actions/posts';
import useStyles from './styles';

//exportable Post used for display on the project posts page
const Post = ({ post }) => {
  //defines constants used in the rest of the exportable
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  //the actually returned post of type <Card> which is displayed to the project posts page
  return (

  //utilizes the time at which the post was created
  //users are able to delete their own posts (connected to the user ID) and admins can delete any post, through clicking the delete button
  //displays all of the information on the post submitted through the form
  //only admins can make posts featured or not featured by clicking on the labeled button either on the project post page or home page
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography className={classes.major} gutterBottom variant="h6" component="h3">{post.major}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h4" component="h1">{post.title}</Typography>
      <CardContent>
        <Typography variant="body1" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {(user?.result?._id === post?.creator || user?.result?.isAdmin) && (
        <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
        )}
      </CardActions>
      <CardActions>
      {(user?.result?.isAdmin) && (!post.isFeaturedPost) && (
        <Button size="small" color="secondary" onClick={() => dispatch(switchFeatured(post._id, post.isFeaturedPost))}>
             <StarOutlineIcon fontSize="small" /> Change to featured 
          </Button>
        )}
        {(user?.result?.isAdmin) && (post.isFeaturedPost) && (
        <Button size="small" color="secondary" onClick={() => dispatch(switchFeatured(post._id, post.isFeaturedPost))}>
             <StarIcon fontSize="small" /> Change to not featured
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
