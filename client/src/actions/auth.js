import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

//these action type functions take in data and requests from the user to be dispatched with regards to how the imported axios functions connect the front and back ends with respect to user authentication



//this function awaits a request since it is async (why it uses await keyword)
//the signin action once called and the user is successfully signed in reroutes the user to the homepage
export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/');

  } catch (error) {
    console.log(error);
  }
};

//this function awaits a request since it is async (why it uses await keyword)
//the signup action once called and the user successfully creates an account reroutes the user to the homepage
export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');

  } catch (error) {
    console.log(error);
  }
};

//this function awaits a request since it is async (why it uses await keyword)
//the updateProfile action once called and the user successfully changes their profile information to their liking reroutes the user to the homepage
export const updateProfile = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.updateProfile(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
    
  } catch (error) {
    console.log(error);
  }
};