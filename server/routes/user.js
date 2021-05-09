import express from "express";
import { signin, signup, updateProfile } from "../controllers/user.js";

//defining an express router to allow for efficient URL routing for subpages for users
const router = express.Router();

//uses controllers imported from ../controllers/user.js to allow for connection to backend to work properly
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/update", updateProfile);

export default router;