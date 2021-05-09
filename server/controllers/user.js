import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const secret = 'test';

//this file very important for express middleware for project posts, connecting the front and back ends of user input and data storage via the schema



//this function awaits a request since it is async (why it uses await keyword)
//signin essentially waits for a req from actions by the user/viewer to trasnfer data from the frontend to the backend via the schema to allow the user to signin
//makes sure that the profile is correct using authentication (email and password match) as well as creates a token that expires after a certain amount of time
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//this function awaits a request since it is async (why it uses await keyword)
//signup essentially waits for a req from actions by the user/viewer to trasnfer data from the frontend to the backend via the schema to allow the user to create a new account
//makes sure that the profile can be created using authentication (email doesn't already exist) as well as creates a token that expires after a certain amount of time
export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, major: '', gradYear: '', clubPosition: '', isAdmin: false });

    //console.log(result);

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};

//this function awaits a request since it is async (why it uses await keyword)
//updateProfile essentially waits for a req from actions by the user/viewer to trasnfer data from the frontend to the backend via the schema to allow the user to change the data associated with their profile
//makes sure that the profile is correct using authentication (email and password match with token logged in) as well as creates a token that expires after a certain amount of time
export const updateProfile = async(req,res) => {

  const { email, password, firstName, lastName, gradYear, major, clubPosition } = req.body;

  try {

    var oldUser = await UserModel.findOne({ email });
    
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
    
    oldUser = await UserModel.updateOne({ email: email, name: `${firstName} ${lastName}`, major: major, gradYear: gradYear, clubPosition: clubPosition });

    const token = jwt.sign( { email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" } );

    res.status(202).json({result: oldUser, token});
    
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};