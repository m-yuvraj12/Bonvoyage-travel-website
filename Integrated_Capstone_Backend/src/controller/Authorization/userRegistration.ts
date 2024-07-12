import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { pool } from '../../../db';
import { validateNumber, validateemail } from "../../validations/validation_functions";

const userregister = async (req: Request, res: Response) => {
    const { Username, Email, Phone, Password, ConfirmPassword, Address } = req.body
    const phone = parseInt(Phone)
    if (validateemail(Email)) {
        if (validateNumber(Phone)) {
            if (Password === ConfirmPassword) {

                const HashedPassword = await bcrypt.hash(Password, 10)

                const checkuser = `select * from users where username='${Username}' and useremail='${Email}' `
                try {
                    const result = await pool.query(checkuser)

                    if (result.rows.length === 0) {

                        try {
                            const one = `insert into users (username,useremail,userphone,userpassword,useraddress,createdat) 
                        values('${Username}','${Email}',${phone},'${HashedPassword}','${Address}',current_timestamp)`

                            console.log("hello")
                            console.log(Username,Email,phone,HashedPassword,Address)
                            const returquery = await pool.query(one)
                            console.log(returquery.rows)
                            res.json({ message: 'user created sucessfully', action: true })
                        }
                        catch (error) {
                            res.json({ message: 'Failed to signup try after some more time', action: false })
                        }
                    }
                    else {
                        res.json({ message: 'you are an existing user', action: false })
                    }
                }
                catch (error) {
                    res.json({ message: 'some error ocuured while singing up', action: false })

                }
            }
            else {
                res.json({ message: "Password did not matrch ", action: false })
            }
        }
        else {
            res.json({ message: "Phone number should be of 10 digits", action: false })
        }
    }
    else {
        res.json({ message: 'Invalid email type', action: false })
    }



}


export default userregister