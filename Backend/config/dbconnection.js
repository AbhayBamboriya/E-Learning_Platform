// const mysql=require('mysql')
import mysql from 'mysql'
const connectDb=async()=>{
    try{
        const con=mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"Root@1212#*",
            database:"railway"
        })
        con.connect((err)=>{
            if(err){
                console.log('error');
                
            }
            else{
                console.log('connected');
                
            }
        })
        con.query("select * from station",(err,result)=>{
            console.log('res',result);
            
        })
    }
    catch(e){
        console.log(e);
        process.exit(1);
    }
}

export default connectDb