import express from 'express';
import { registerUser, loginUser, forgotPassword, resetPassword } from '../../controllers/authControllers/auth';

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Forgot Password route
router.post('/forgot-password',forgotPassword)

// Reset Password route
router.post('/reset-password',resetPassword)

router.get("/test",(req,res)=>{
    res.json({success:true,message:"Test Success full"})
})


export default router;
