import { Router } from 'express'
import {registerUserController, updateUserDetails, verifyEmailController, loginController, uploadavatar, logoutController,refreshToken } from '../controllers/user.controller.js'
import auth from '../middleware/auth.js'
import upload from '../middleware/multer.js'


const userRouter = Router()

userRouter.post('/register',registerUserController)
userRouter.post('/verify-email',verifyEmailController)
userRouter.post('/login',loginController)
userRouter.post('/logout',auth,logoutController)
userRouter.put('/upload-avatar',auth,upload.single('avatar'),uploadavatar)
userRouter.put('/update-user',auth,updateUserDetails)

userRouter.post('/refresh-token',refreshToken)

export default userRouter