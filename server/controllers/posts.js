import express from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

//the express router is encompassed in this variable for easier use throughout the file
const router = express.Router();

//this file very important for express middleware for project posts, connecting the front and back ends of user input and data storage via the schema



//this function awaits a request since it is async (why it uses await keyword)
//getPosts essentially waits for a req from actions by the user to trasnfer data from the frontend to the backend via the schema by getting all instances
export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
                
        res.status(200).json(postMessages);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//this function awaits a request since it is async (why it uses await keyword)
//getFeaturedPosts essentially waits for a req from actions by the user to trasnfer data from the frontend to the backend via the schema by getting only schemas with isFeaturedPost as true
export const getFeaturedPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find({ isFeaturedPost: true });
                
        res.status(200).json(postMessages);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//this function awaits a request since it is async (why it uses await keyword)
//switchFeatured essentially waits for a req from actions by the user to trasnfer data from the frontend to the backend via the schema by changing the isAdmin data
export const switchFeatured = async (req, res) => {
    try {
        const { id } = req.params;
        const { isFeaturedPost } = req.body;
        var changer = !isFeaturedPost;

        await PostMessage.findByIdAndUpdate(id, {$set: { isFeaturedPost: changer }});

    } catch (error) {
        res.status(404).json({ message: error.message });
    }


}

//this function awaits a request since it is async (why it uses await keyword)
//getPost essentially waits for a req from actions by the user to trasnfer data from the frontend to the backend via the schema by getting an instance
export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//this function awaits a request since it is async (why it uses await keyword)
//createPost essentially waits for a req from actions by the user to trasnfer data from the frontend to the backend via the schema by filling the schema
export const createPost = async (req, res) => {
    const post = req.body;
    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString(), isFeaturedPost: false });
    
    try {
        await newPostMessage.save();

        res.status(201).json( newPostMessage );

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//this function awaits a request since it is async (why it uses await keyword)
//updatePost essentially waits for a req from actions by the user to trasnfer data from the frontend to the backend via the schema by changing the data
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

//this function awaits a request since it is async (why it uses await keyword)
//deletePost essentially waits for a req from actions by the user to trasnfer data from the frontend to the backend via the schema by deleting the instance of the schema
export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export default router;