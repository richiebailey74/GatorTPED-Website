import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api/index.js';

//these action type functions take in data and requests from the user to be dispatched with regards to how the imported axios functions connect the front and back ends with respect to posting executive board members



//this function awaits a request since it is async (why it uses await keyword)
//the getPostsEB action is called and the eboard members are successfully received and are to be displayed on the executive board member page
export const getPostsEB = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPostsEB();

    dispatch({ type: FETCH_ALL, payload: data });

  } catch (error) {
    console.log(error.message);
  }
};

//this function awaits a request since it is async (why it uses await keyword)
//the createPostEB action is called and the data input into the form by the admin is then used to create an eboard member and then to be displayed on the executive board member page
export const createPostEB = (postEB) => async (dispatch) => {
  try {
    const { data } = await api.createPostEB(postEB);

    dispatch({ type: CREATE, payload: data });

  } catch (error) {
    console.log(error.message);
  }
};

//this function awaits a request since it is async (why it uses await keyword)
//the updatePostEB action is an action that allows admins to change the data within the eboard member in the database to display differently
//this is a temporarily disabled action, could have potential use in the future but as of now is not available to the admin
export const updatePostEB = (id, postEB) => async (dispatch) => {
  try {
    const { data } = await api.updatePostEB(id, postEB);

    dispatch({ type: UPDATE, payload: data });

  } catch (error) {
    console.log(error.message);
  }
};

//this function awaits a request since it is async (why it uses await keyword)
//the deletePostEB action is called and the eboard member is successfully removed/deleted from the database and subsequently removed from display on the website
export const deletePostEB = (id) => async (dispatch) => {
  try {
    await api.deletePostEB(id);

    dispatch({ type: DELETE, payload: id });
    
  } catch (error) {
    console.log(error.message);
  }
};