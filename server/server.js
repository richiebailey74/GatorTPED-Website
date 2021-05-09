import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";
import EBpostRoutes from './routes/postsEB.js';
import dotenv from 'dotenv';

//configures the dotenv
dotenv.config();

//compresses express functionality to a variable name
const app = express();

//connects express to json and the encoded url's for use
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

//connects express to use the routes that are then used for subpage redirects (how backend is connected to frontend essentially)
app.use('/posts', postRoutes);
app.use("/user", userRouter);
app.use('/postsEB', EBpostRoutes);

//this is the connection url that is connected to for the website to be displayed to using the default (go to) port of 5000
const CONNECTION_URL = process.env.connectionuri;
const PORT = process.env.PORT|| 5000;

//makes the actual connection between the url and the mongoose database in mongoDB - will catch and display an error if the connection wasn't made properly
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);