import { Router } from "express";
import { login, logout, register } from "../Controller/userController.js";

const router =Router(); //creating instance
// accept update user all are working correctly
router.post('/register',register)   //in upload single file orhow many file u have to upload
router.post('/login',login) 
router.get('/logout',logout)


export default router