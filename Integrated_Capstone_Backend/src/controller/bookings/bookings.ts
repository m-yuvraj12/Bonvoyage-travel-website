
import { pool } from "../../../db";
import express, { Request, Response } from 'express';

const myBookings = async(req:Request,res:Response)=>{
    const {uid} = req.body
    try {
        const allQuery = `select packageImage,packageName,bookingDate,bookingRooms,bookingPerson,bookingID from Bookings where userid = '${uid}'`
        const bookingDetails = await pool.query(allQuery)
        res.json(bookingDetails.rows)
    }
    catch (error) {
        res.json(error)
    }



}
const createBookings = async(req:Request,res:Response)=>{
    const { packageid, packagename, bookingdate, packageimage, bookingperson, bookingrooms,uid } = req.body
    try {
        console.log(uid)
        const book = `insert into bookings(userid,packageid, packagename, bookingdate, packageimage, bookingperson, bookingrooms, createdat) values(${uid},'${packageid}','${packagename}','${bookingdate}','${packageimage}',${parseInt(bookingperson)},${parseInt(bookingrooms)},current_timestamp)`
        const booked = await pool.query(book)
        res.json({message:'Booking Done',action:true})
    }
    catch (error) {
        res.json({message:'Fill all Fields',action:false})
    }
}
const deleteBookings = async(req:Request,res:Response)=>{
    const { bookingID,uid } = req.body
    try {
        const query = `delete from bookings where bookingid = ${parseInt(bookingID)}`
        const deleteBooking = await pool.query(query)
        console.log(deleteBooking.rows)
        res.json(deleteBooking.rows)
    }
    catch (error) {
        res.json(error)
    }
}
const updateBookings = async(req:Request,res:Response)=>{
    const { bookingid, bookingdate, bookingperson, bookingrooms,uid } = req.body
    try {
        const updateBook = `update bookings set bookingdate='${bookingdate}', bookingperson='${bookingperson}', bookingrooms='${bookingrooms}' where bookingid=${parseInt(bookingid)}`
        const booked = await pool.query(updateBook)
        res.json('Update Booking Done')
    }
    catch (error) {
        res.json(error)
    }
}

export {myBookings,createBookings,deleteBookings,updateBookings}