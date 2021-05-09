import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api/index.js';

//these action type functions take in data and requests from the user to be dispatched with regards to how the imported axios functions connect the front and back ends with respect to user posting projects



//this function awaits a request since it is async (why it uses await keyword)
//the getPosts action is called and the posts are successfully received and are to be displayed on the project posts page
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: FETCH_ALL, payload: data });

  } catch (error) {
    console.log(error.message);
  }
};

//this function awaits a request since it is async (why it uses await keyword)
//the getFeaturedPosts action is called and the featured posts are successfully received and are to be displayed on the home page
export const getFeaturedPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchFeaturedPosts();

    dispatch({ type: FETCH_ALL, payload: data });

  } catch (error) {
    console.log(error.message);
  }
};

//this function awaits a request since it is async (why it uses await keyword)
//the switchFeatured action is called and the post's isFeatured status in the database is changed and the front end display will then be changed accordingly
export const switchFeatured = (id, isFeaturedPost) => async (dispatch) => {
  try {
    const { data } = await api.switchFeatured(id, isFeaturedPost);
    
    dispatch({ type: UPDATE, payload: data });

  } catch (error) {
      console.log(error);
  }
};

//this function awaits a request since it is async (why it uses await keyword)
//the createPost action is called and the data input into the form by the user is then used to create a post and then to be displayed on the project posts page
export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });

  } catch (error) {
    console.log(error.message);
  }
};

//this function awaits a request since it is async (why it uses await keyword)
//the updatePost action is an action that allows users to change the data within their post in the database to display differently
//this is a temporarily disabled action, could have potential use in the future but as of now is not available to any user 
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });

  } catch (error) {
    console.log(error.message);
  }
};

//this function awaits a request since it is async (why it uses await keyword)
//the deletePost action is called and the post is successfully removed/deleted from the database and subsequently removed from display on the website
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
    
  } catch (error) {
    console.log(error.message);
  }
};
