import { pool } from "../../../db";
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { json } from "stream/consumers";
const JWT_SECRET = 'your-secret-key';


const userlogin = async(req:Request,res:Response)=>{
    const{Email,Password} = req.body
    const checkuser = `select * from users where useremail='${Email}'`
    try{
        // console.log('1')
        const result = await pool.query(checkuser)
        if(result.rows.length!==0){
            try{
                // console.log('2')
                const check = await bcrypt.compare(Password,result.rows[0].userpassword)
                if(check){
                    try{
                        const query = `select username,userid from users where useremail='${Email}'`
                        const queryresult = await pool.query(query)
                        const token = jwt.sign({userid:Email,paswd:Password,user:queryresult.rows[0].username,id:queryresult.rows[0].userid},JWT_SECRET)
                        
                        res.json({message:"user logined",action:true,token:token,user:queryresult.rows[0].username,id:queryresult.rows[0].userid})
                    }catch(error){
                        res.json({message:'some error ocurred',action:false,token:''})
                    }
                   
    
                }
                else{
                    res.json({message:'invalid credentials',action:false,token:''})
    
                }
            }
            catch(error){
                res.json({message:'error in decrypting',action:false,token:''})
            }
            

        }
        else{
            res.json({message:'user does not exits',action:false,token:''})
        }
    }
    catch(error){
        res.json({message:'some error occured while loging in',action:false,token:''})
    }
   

}

export default userlogin


{
    // try{
    //     const result = await pool.query(checkuser)
        
    //     if(await bcrypt.compare(Password,result.rows[0].userPassword)){
    //         const token = jwt.sign({user:Email,paswd:Password},JWT_SECRET)
    //         res.json({message:"user logined",action:true,token:token})

    //     }
    //     else{
    //         res.json({message:'invalid credentials',action:false,token:''})
    //     }
    // }
    // catch(error){
    //     res.json({message:'some error occured while loging in',action:false,token:''})
    // }
}