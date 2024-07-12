import { pool } from "../../../db";
import express, { Request, Response } from 'express';

const Packages = async(req:Request,res:Response)=>{

    try {
        const allQuery = `select * from packages`
        const bookingDetails = await pool.query(allQuery)
        res.json(bookingDetails.rows)
    }
    catch (error) {
        res.json(error)
    }

}

export {Packages}