import mongoose from 'mongoose';

//this is the mongoose database schema that connects to mongoDB for the information stored for executive board members
const EBmemSchema = mongoose.Schema({
    name: String,
    position: String,
    aboutMe: String,
    classOf: String,
    major: String,
    creator: String,
    picture: String,
})

//exportable mongoDB model/schema
var PostEBmem = mongoose.model('PostEBmem', EBmemSchema);

export default PostEBmem;