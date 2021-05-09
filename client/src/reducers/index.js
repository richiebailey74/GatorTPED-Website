import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import postsEB from './postsEB';

//combines all reducers for the website that might require a change in state and exports them as one exportable
//uses in the client/index.js file which is used for the overarching application and for when changes in state are required
export const reducers = combineReducers({ posts, auth, postsEB });