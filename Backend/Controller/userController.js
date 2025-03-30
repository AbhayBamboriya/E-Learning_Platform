import User from '../Model/user.js';
import bcrypt from 'bcryptjs'
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



export{
    register,
    login,
    logout
}