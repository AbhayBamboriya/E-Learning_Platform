import User from '../Model/user.js';
import bcrypt from 'bcryptjs'
import { connection } from '../Model/user.js';
import AppError from '../utils/error.js';
const cookieOptions={
    maxAge:60*60*1000,
    httpOnly:true, 
    secure:true 
}
const register  = async(req,res,next)=>{
    try{
        const { Name, email, password, role } = req.body;
        console.log(req.body);
        if(!email || !password || !role || !Name){
            return next(new AppError('All fields are Required',400))
        }
        
        const existingUser = await User.findByEmail(email);
            console.log('exist ',existingUser);
            
            if (existingUser) {
              return res.status(400).json({ message: 'User already exists' });
            }
        
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = { email, password: hashedPassword,role,Name };
            
            const id=await User.createUser(user);
            console.log('reached',id);
            
            const token=await User.generateJWTToken(role,id,Name)
                console.log('token is',token);
                // console.log('user',User);
                
                // existingUser.password=undefined
                res.user={Name,email,password,role}
                res.cookie('token',token,cookieOptions)
                res.status(200).json({
                    success:true,
                    message:"User Registered successfully",
                    // existingUser
                    user
                })

    }
    catch(e){
        return next(new AppError(e.message,500))
    }
}

const login=async(req,res,next)=>{
    try{
            const {email,password}=req.body;
            console.log('email',email,' ',password);
            if(!email || !password){
                return next (new AppError('All fields are required',400))
            }
            
            const existingUser = await User.findByEmail(email);
                console.log('exist ',existingUser);
            if(!existingUser)   return next(new AppError('User is not registered',400))
            const c=await User.comparePassword(password,existingUser.password);
            if(!c)  return next (new AppError('Incorrect Password',400))
            console.log('rr');
            
                const token=await User.generateJWTToken(existingUser.role,existingUser.id,existingUser.name)
                console.log('token is',token);
                // console.log('user',User);
                
                existingUser.password=undefined
                res.user=existingUser
                res.cookie('token',token,cookieOptions)
                console.log('cokkeensndnshs',res.cookie);
                console.log('sdi',res.cookie);
                
                res.status(200).json({
                    success:true,
                    message:"User loged in successfully",
                    existingUser
                })



           // res.json({ token, role: user.role });
        ;
    }
    catch(e){
        return next(new AppError(e.message,500))
    }
    
}

// const 
const logout=(req,res)=>{
    res.cookie('token',null,{
        secure:true,
        maxAge:0,
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"User Logged out successfully"
    })
}


const feedback = async (req, res, next) => {
    try {
        const { teacherId, feedbackText } = req.body;
        if (req.user.role == 'teacher') return next(new AppError('Not Allowed To give feedback', 500));

        const studentId = req.user.id;

        if (!teacherId || !feedbackText) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Ensure the student and teacher exist and have the correct roles
        const studentQuery = `SELECT id, role FROM users WHERE id = ? AND role = 'student'`;
        const teacherQuery = `SELECT id, role FROM users WHERE id = ? AND role = 'teacher'`;

        // Use dbConfig.execute to check student and teacher
        const [studentRows] = await new Promise((resolve, reject) => {
            connection.query(studentQuery, [studentId], (err, res) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                resolve(res);
            });
        });
        console.log('assk');
        
        const [teacherRows] = await new Promise((resolve, reject) => {
            connection.query(teacherQuery, [teacherId], (err, res) => {
                if (err) {
                    return reject(err);
                }
                resolve(res);
            });
        });
        console.log('l ',studentRows.length," ",teacherRows.length);
        
        if (studentRows.length === 0 || teacherRows.length === 0) {
            return res.status(400).json({ message: 'Invalid student or teacher ID.' });
        }

        // Insert feedback into the feedback table
        const insertQuery = `INSERT INTO feedback (student_id, teacher_id, feedback_text) VALUES (?, ?, ?)`;
        await new Promise((resolve, reject) => {
            connection.query(insertQuery, [studentId, teacherId, feedbackText], (err, res) => {
                if (err) {
                    return reject(err);
                }
                resolve(res);
            });
        });
        res.status(200).json({ message: 'Feedback submitted successfully!' });
    } catch (e) {
        return next(new AppError(e.message, 500));
    }
};




export{
    register,
    login,
    logout,
    feedback
}