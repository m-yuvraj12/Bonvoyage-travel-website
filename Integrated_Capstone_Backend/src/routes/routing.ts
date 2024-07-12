
import express from 'express';
import userregister from '../controller/Authorization/userRegistration'
import userlogin from '../controller/Authorization/userLogin';
import { Packages } from '../controller/Packages/Packages';
import { createBookings, deleteBookings, myBookings, updateBookings } from '../controller/bookings/bookings';
import { addWishlist, deleteWishlist, wishlist } from '../controller/bookings/Wishlists';





const router = express.Router()
router.use(express.json())
router.post('/register',userregister)
router.post('/login',userlogin)
router.get('/packages',Packages)
router.post('/bookings',myBookings)
router.post('/wishlist',wishlist)
router.post('/del-wishlist',deleteWishlist)
router.post('/create-booking',createBookings)
router.post('/del-booking',deleteBookings)
router.post('/update-booking',updateBookings)
router.post('/add-wishlist',addWishlist)



module.exports = router