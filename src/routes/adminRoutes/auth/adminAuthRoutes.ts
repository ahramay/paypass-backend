import express from "express"
import { loginAdmin, registerAdmin } from "../../../controllers/adminControllers/auth/authAminController"
const router = express.Router()

router.post('/login',loginAdmin)
router.post('/register',registerAdmin)

export default router
