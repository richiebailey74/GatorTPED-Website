import express from 'express';
import { getPosts, getFeaturedPosts, createPost, updatePost, deletePost, switchFeatured } from '../controllers/posts.js';
import auth from "../middleware/auth.js";

//defining an express router to allow for efficient URL routing for subpages for project posts
const router = express.Router();

//uses controllers imported from ../controllers/posts.js to allow for connection to backend to work properly
//utilizes auth for when user authentication is needed for a particular URL routing
router.get('/', getPosts);
router.get('/featured', getFeaturedPosts);
router.post('/', auth, createPost);
router.put('/:id', switchFeatured);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

export default router;