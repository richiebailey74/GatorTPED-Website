import express from 'express';
import mongoose from 'mongoose';
import PostEBmem from '../models/postEBmem.js';

//the express router is encompassed in this variable for easier use throughout the file
const router = express.Router();

//this file very important for express middleware for project posts, connecting the front and back ends of user input and data storage via the schema



//this function awaits a request since it is async (why it uses await keyword)
//getPostsEB essentially waits for a req from actions by the user to trasnfer data from the frontend to the backend via the schema by getting all instances
export const getPostsEB = async (req, res) => { 
    try {
        const postEBmems = await PostEBmem.find();
                
        res.status(200).json(postEBmems);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//this function awaits a request since it is async (why it uses await keyword)
//getPostEB essentially waits for a req from actions by the user to trasnfer data from the frontend to the backend via the schema by getting an instance
export const getPostEB = async (req, res) => { 
    const { id } = req.params;

    try {
        const postEB = await PostEBmem.findById(id);
        
        res.status(200).json(postEB);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//this function awaits a request since it is async (why it uses await keyword)
//createPostEB essentially waits for a req from actions by the user to trasnfer data from the frontend to the backend via the schema by filling the schema
export const createPostEB = async (req, res) => {
    const postEB = req.body;
    const newPostEBmem = new PostEBmem({ ...postEB, creator: req.userId });

    try {
        await newPostEBmem.save();

        res.status(201).json( newPostEBmem );

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//this function awaits a request since it is async (why it uses await keyword)
//updatePostEB essentially waits for a req from actions by the user to trasnfer data from the frontend to the backend via the schema by changing the data
export const updatePostEB = async (req, res) => {
    const { id } = req.params;
    const { name, position, aboutMe, classOf, major, creator, picture } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No EB mem with id: ${id}`);

    const updatedPostEB = { name, position, aboutMe, classOf, major, creator, picture, _id: id };

    await PostEBmem.findByIdAndUpdate(id, updatedPostEB, { new: true });

    res.json(updatedPostEB);
}

//this function awaits a request since it is async (why it uses await keyword)
//deletePostEB essentially waits for a req from actions by the user to trasnfer data from the frontend to the backend via the schema by deleting the instance of the schema
export const deletePostEB = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No EB mem with id: ${id}`);

    await PostEBmem.findByIdAndRemove(id);

    res.json({ message: "Executive Board member deleted successfully." });
}

export default router;