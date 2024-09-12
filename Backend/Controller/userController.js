import crypto from 'crypto'
import User from '../Model/user.js';
import bcrypt from 'bcryptjs'
import AppError from '../utils/error.js';
const cookieOptions={
    maxAge:7*24*60*60*1000,
    // httpOnly:true, 
    // secure:true 
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
            
            await User.createUser(user);
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
            
                const token=await User.generateJWTToken(existingUser.role,existingUser.id)
                console.log('token is',token);
                // console.log('user',User);
                
                existingUser.password=undefined
                res.user=existingUser
                res.cookie('token',token,cookieOptions)
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
// const logout=(req,res)=>{
//     res.cookie('token',null,{
//         secure:true,
//         maxAge:0,
//         httpOnly:true
//     })
//     res.status(200).json({
//         success:true,
//         message:"User Logged out successfully"
//     })
// }



// // firgot and reset password is not working
// const forgotPassword=async(req,res,next)=>{
//     try{
//         const {email}=req.body;
//         if(!email){
//             return next(new AppError('Email is require',400))
//         }
//         const user=await User.findOne({email})
//         if(!user){
//             return next(new AppError('Enter registered email',400))
//         } 
//         // Generating the reset token via the method we have in user model
//         const resetToken=await user.generatePasswordResetToken();
//         // saving the token to db
//         // saving the current token to DB so that for validation
//         await user.save() 
//         // console.log("token "+resetToken);
//         const resetPasswordUrl=`${process.env.FRONTEND_URL}password/${resetToken}`;
//         console.log("reset Token "+resetPasswordUrl);
//         const message= 'Mail is send to registered email id' 
//         const subject='Reset Password';
//         try{ 
//             // method that will send the  mail;  ;
//             const e=await sendEmail(email,subject,message)
//             // console.log("email "+e);
//             res.status(200).json({
//                 success:true,
//                 message:`Reset Password token has been send to ${email} successfully`,
//                 resetToken
//             })
//         }
//         catch(e){
//             user.forgotPasswordExpiry=undefined
//             user.forgotPasswordToken=undefined
//             await user.save()
//             return next(new AppError(toString(e).message,500)) 
//         }
//     }
//     catch(e){
//         return next(new AppError(e.message,500))
//     }
// }
// const resetPassword=async(req,res,next)=>{
//    try{
//         console.log('reset Password');
//         console.log('req from frontend',req);
//         console.log("params "+req.params);
//         console.log("body "+JSON.stringify(req.body));
//         const {resetToken} = req.params;
//         const{password}=req.body
//         console.log("reset Token "+resetToken);
//         if(!password){
//             return next(
//                 new AppError('password not present',400)
//             )
//         }
//         console.log("password "+password);
//         const forgotPasswordToken=crypto
//             .createHash('sha256')
//             .update(resetToken)
//             .digest('hex')
//         const user = await User.findOne({
//             // that token is existing or not
//             forgotPasswordToken,
//             forgotPasswordExpiry:{$gt: Date.now()}
//         })
//         if(!user){
//             return next(
//                 new AppError('Token is invalid please try again',400)
//             )
//         }

//         user.password=password;
//         user.forgotPasswordExpiry=undefined
//         user.forgotPasswordToken=undefined
//         user.save();
//         res.status(200).json({
//             success:true,
//             message:'Password changed success'
//         })
//    }
//    catch(e){
//         return next(new AppError(e.message,500))
//     }

// }

// const changePassword=async(req,res,next)=>{

//     try{
//         const {oldpassword,newpassword}= req.body
//         const {id}=req.user
//         console.log('id '+id);
//         console.log("old pass "+oldpassword);
//         console.log('new pass '+newpassword);
//         if(!oldpassword || !newpassword){
//             return next(
//                 new AppError('All filds are mandatory',400)
//             )
//         }

//         const user = await User.findById(id).select('+password')
//         if(!user){
//             return next(
//                 new AppError('User does not exist',400)
//             )

//         }
//         const isPasswordValid=await user.comparePassword(oldpassword)
//         if(!isPasswordValid){
//             return next(
//                 new AppError('Invalid old password',400)
//             )

//         }
//         user.password=newpassword
//         await user.save()   //to save the changes in db
//         user.password=undefined
//         res.status(200).json({
//             success:true,
//             message:'Password changed successfully'
//         })
//     }
//     catch(e){
//         return next(new AppError(e.message,500))
//     }
// }



// // }
// const checkUser=async(req,res,next)=>{
//     try{
//         console.log('req',req.body);
//         const {email,check}=req.body;
//         console.log('email',email);
//         if(!email){
//             return next(new AppError('Email is required',400))
//         }
//         if(check){
//             const user=await User.findOne({email})
//             if(user){
//                 res.status(400).json({
//                     success:false,
//                     message:'Email ID already Register'
//                 })
//                 return
//             } 
//             res.status(200).json({
//                 success:true,
//                 message:'You can use these email'
//             })
            
//         }
//         else{
//             // it is for forgot passwrd
//             const user=await User.findOne({email})
//             if(!user){
//                 res.status(400).json({
//                     success:false,
//                     message:'Enter Registered UserId'
//                 })
//                 return
//             } 
//             res.status(200).json({
//                 success:true,
//                 message:'Gmail is verfied'
//             })

            
//         }
//     }
//     catch(e){
//         return next(new AppError(e.message,500))
//     }
// }

// const detail=async(req,res,next)=>{
//     try{
//         const {id}=req.body;
//         console.log('id',id);
//         if(!id){
//             return new AppError(400,'id required')
//         }
//         const user=await User.findById(id)
//         if(user){
//             res.status(400).json({
//                 success:true,
//                 // message:'Email ID already Register',
//                 user
//             }) 
//         }    
//     }
//     catch(e){
//         console.log(e);
//     }
 // if(!(user && (await user.comparePassword(password)))){
        //     return next(new AppError('Email and Password doesnot match',400))
        // }
        // console.log('user from login ',user);
        // const token=await user.generateJWTToken()
        // console.log('token from login',token);
        // user.password=undefined
        // res.cookie('token',token,cookieOptions)
        // console.log('after change ',res.cookie._id);
// }
// const allUser=async(req,res,next)=>{
//     try{
//         const id=req.params.userId
//         // $ne=not equal to
//         const users=await User.find({_id:{$ne:id}})
//         const userData=Promise.all(users.map(async(user)=>{
//             return  {email:user.email,UserName:user.UserName,Name:user.Name,Profile:user.profile.secure_url}
//         }))
//         res.status(200).json(await userData)
//     }
//     catch(e){
//         console.log(e);
//     }
// }
export{
    register,
    login
}