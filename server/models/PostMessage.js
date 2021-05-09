import mongoose from 'mongoose';

//this is the mongoose database schema that connects to mongoDB for the information stored for project posts
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    selectedFile: String,
    isFeaturedPost: {type: Boolean},
    major: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

//exportable mongoDB model/schema
var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;