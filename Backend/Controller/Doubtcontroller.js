import express  from 'express';
// import db from '../Model';  // Add your database connection file here
// import  { authenticateToken } from '../middleware/authMiddleware.js';
const router = express.Router();
import db, { Doubt } from '../Model/user.js'
import { isLoggedIn } from '../middleware/authMiddleware.js';

// Get All Doubts (Students can post, Teachers can answer)
router.get('/', (req, res) => {
    const sql = 'SELECT doubts.*, users.name AS student_name FROM doubts JOIN users ON doubts.user_id = users.id';
    db.query(sql, (err, doubts) => {
        if (err) {
            return res.status(500).send('Error fetching doubts.');
        }
        res.json(doubts);
    });
});

// Post a Doubt (Only students)
router.post('/',isLoggedIn,async(req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id;
    console.log(title,description,req.user);
    
    if (req.user.role !== 'teacher') {
        return res.status(403).send('Only students can post doubts.');
    }

    await Doubt.PostDoubt(title,description,userId);
    res.status(200).json({success:true,message:"Doubt posted Successfully"});
});

// Answer a Doubt (Only teachers)
router.post('/:id/answer', async(req, res) => {
    const doubtId = req.params.id;
    const { answer } = req.body;
    const Id = req.user;

    console.log('user',req.user);
    
    await Doubt.SolveDoubt(doubtId,answer,Id)
    res.status(200).json({success:true,message:"Answer posted Successfully"});
});

 export default router;
