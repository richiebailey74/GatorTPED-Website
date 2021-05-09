import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

//using certain action types, this reducer handles all types of changes in state with regards to executive board members on the eboard page
const eb = (postsEB = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...postsEB, action.payload];
    case UPDATE:
      return postsEB.map((postEB) => (postEB._id === action.payload._id ? action.payload : postEB));
    case DELETE:
      return postsEB.filter((postEB) => postEB._id !== action.payload);
    default:
      return postsEB;
  }
};

export default eb;

