import { Router } from "express";
import { feedback, login, logout, register } from "../Controller/userController.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";

const router =Router(); //creating instance
// accept update user all are working correctly
router.post('/register',register)   //in upload single file orhow many file u have to upload
router.post('/login',login) 
router.get('/logout',logout)
router.post('/feedback',isLoggedIn,feedback)


export default router