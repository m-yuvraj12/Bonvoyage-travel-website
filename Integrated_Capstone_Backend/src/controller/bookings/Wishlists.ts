import { pool } from "../../../db";
import express, { Request, Response } from 'express';


const wishlist = async(req:Request,res:Response)=>{
    const {uid} = req.body
    try {
        const query = `select packageImage,packageDesc,packageCity,packageID from Packages inner join Users on Packages.packageID=any(users.userWishlist) where Users.userid=${parseInt(uid)}`
        const wishlist = await pool.query(query)
        res.json(wishlist.rows)
    }
    catch (error) {
        res.json(error)
    }
}

const deleteWishlist = async(req:Request,res:Response)=>{
    const { packageID,uid } = req.body
    try {
        const query = `update Users set userwishlist = array_remove(userWishlist,'${packageID}') where userid = '${parseInt(uid)}'`
        const deleteWishlist = await pool.query(query)
        res.json(deleteWishlist.rows)
    }
    catch (error) {
        res.json(error)
    }
}

const addWishlist = async(req:Request,res:Response)=>{
    const { packageid,uid } = req.body
    
    try {
        console.log(uid)
        const query = `update users set userwishlist = array_append(userwishlist, '${packageid}') where userid = '${parseInt(uid)}' and '${packageid}' not in (select unnest(userwishlist) from users where userid = '${parseInt(uid)}');
        `
        const addWishlist = await pool.query(query)
        res.json({message:'Added to wishlist',action:true})
    }
    catch (error) {
        res.json(error)
        
    }
}

export {wishlist,deleteWishlist,addWishlist}