import express  from 'express';
const router = express.Router();
import db, { Doubt } from '../Model/user.js'
import { isLoggedIn } from '../middleware/authMiddleware.js';
import upload from '../middleware/multeer.middleware.js';
import cloudinary from 'cloudinary'
import User from '../Model/user.js';
import AppError from '../utils/error.js';
// Get All Doubts (Students can post, Teachers can answer)
router.get('/', async(req, res) => {
    const doubts=await Doubt.GetAllDoubts()
    console.log('d',doubts);
    
    res.status(200).json({
        "Doubts":doubts,
        "success":true
    })
});




// Post a Doubt (Only students)
router.post('/',isLoggedIn,async(req, res) => {
    try{
        const { title, description } = req.body;
    const userId = req.user.id;
    console.log(title,description,req.user);
    
    // if (req.user.role !== 'student') {
    //     return res.status(403).send('Only students can post doubts.');
    // }

    await Doubt.PostDoubt(title,description,userId);
    res.status(200).json({success:true,message:"Doubt posted Successfully"});
    }
    catch(e){
        return next(new AppError(e.message,500))   
    }
});


router.post('/upload-pdf', isLoggedIn,upload.single('pdf'),async (req, res) => {
    
    let publicURL='dk'
    let secureUrl='cloudinary://378171611453713:jar_yV68UrVNSKbFbxleqoBxKJQ@dix9kn7zm'

    
    if(req.file){
        
        try{
             const result= await cloudinary.uploader.upload(req.file.path, { resource_type: "raw" }, function(error, result) {
                if (result) {
                //   console.log("PDF URL:", result.url);
                } else {
                //   console.log("Error:", error);
                }
              });

            // console.log('res',result);
            // try
            if(result){
                publicURL=result.public_id
                secureUrl=result.secure_url    
                // console.log("URL IMAGE",result.secure_url);

                // remove file from local system/server
                // fs.rm(`uploads/${req.file.filename}`)

            }
        }catch(e){
            // return next(
            //     new AppError(e.message || 'File not uploaded,please try again',500)
            // )
            res.status(500).json({success:false,message:e.message});
        }
    }
    const obj={
        public_url:publicURL,
        secure_url:secureUrl   
    }
    console.log('fkddkffdfdfdfdfdfdfd00',req.body);
    console.log('user',req.user);
    
    const { teacherName, subject } = req.body;

    // Insert into the MySQL database
    const sql = 'INSERT INTO teachers (teacherName, url, subject) VALUES (?, ?, ?)';
    await Doubt.UploadResources(req.user.name, secureUrl, subject);
    res.status(200).json({success:true,message:"Resources uploaded Successfully",url:secureUrl});
  });



  router.get('/Getpdf', isLoggedIn,async (req, res) => {
    
    console.log('insode');
    
    const result=await Doubt.GetResources();
    console.log(result);
    
    res.status(200).json({success:true,data:result});
  });

// Answer a Doubt (Only teachers)
router.post('/:id/answer',isLoggedIn,async(req, res,next) => {
    try{
        const doubtId = req.params.id;
    const { answer } = req.body;
    const Id = req.user;

    console.log('user',req.user);
    
    const result=await Doubt.SolveDoubt(doubtId,answer,Id)
    res.status(200).json({success:true,message:"Answer posted Successfully",result});
    }
    catch(e){
        return next(new AppError(e.message,500)) 
    }
});

router.get('/answer/:id',async(req,res)=>{
    // to get all the answers of particular doubt
    const doubtId=req.params.id
    const result=await Doubt.GetAnswers(doubtId)
    res.status(200).json({
        success:true,
        message:'All Answers',
        result
    })
})

 export default router;
