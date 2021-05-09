import express from 'express';
import { getPostsEB, createPostEB, updatePostEB, deletePostEB } from '../controllers/postsEB.js';
import auth from "../middleware/auth.js";

//defining an express router to allow for efficient URL routing for subpages for posts to executive board members page
const router = express.Router();

//uses controllers imported from ../controllers/postsEB.js to allow for connection to backend to work properly
//utilizes auth for when user authentication is needed for a particular URL routing
router.get('/', getPostsEB);
router.post('/', auth, createPostEB);
router.patch('/:id', auth, updatePostEB);
router.delete('/:id', auth, deletePostEB);

export default router;