import sendEmail from '../config/sendEmail.js'
import UserModel from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js'
import generatedAccessToken from '../utils/generatedAccessToken.js'
import generatedRefreshToken from '../utils/generatedRefreshToken.js'
import { request } from 'express'
import uploadImageCloudinary from '../utils/uploadImageCloudinary.js'
import jwt from 'jsonwebtoken'


export async function registerUserController(request,response){
    try {
        const { name, email , password } = request.body

        if(!name || !email || !password){
            return response.status(400).json({
                message : "Provide email, name, password",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email })

        if(user){
            return response.json({
                message : "Already register email",
                error : true,
                success : false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password,salt)

        const payload = {
            name,
            email,
            password : hashPassword
        }

        const newUser = new UserModel(payload)
        const save = await newUser.save()

        const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

        const verifyEmail = await sendEmail({
            sendTo : email,
            subject : "Verify email from Adyamoyee Store",
            html : verifyEmailTemplate({
                name,
                url : VerifyEmailUrl
            })
        })

        return response.json({
            message : "User register successfully",
            error : false,
            success : true,
            data : save
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function verifyEmailController(request,response){
    try {
        const { code } = request.body

        const user = await UserModel.findOne({ _id : code})

        if(!user){
            return response.status(400).json({
                message : "Invalid code",
                error : true,
                success : false
            })
        }

        const updateUser = await UserModel.updateOne({ _id : code },{
            verify_email : true
        })

        return response.json({
            message : "Verify email done",
            success : true,
            error : false
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : true
        })
    }
}

export async function loginController(request,response){
    try {
        const { email, password } = request.body

        const user = await UserModel.findOne({ email })

        if(!user){
            return response.status(400).json({
                message: "User not registered",
                error: true,
                success: false
            })
        }

        if(user.status !== "Active"){
            return message.status(400).json({
                message: "User is not active",
                error: true,
                success: false
            })
        }

        const checkPassowrd = await bcryptjs.compare(password,  user.password)

        if(!checkPassowrd){
            return message.status(400).json({
                message: "Check your passowrd",
                error: true,
                success: false
            })
        }

        const accessToken = await generatedAccessToken(user._id)
        const refreshToken = await generatedRefreshToken(user._id)

        const cookieOptions = {
            httpOnly : true,
            secure : true,
            sameSite : 'None'
        }

        response.cookie('accessToken',accessToken,cookieOptions)
        response.cookie('refreshToken',refreshToken,cookieOptions)

        return response.json({
            message : "Login successfully",
            error : false,
            success : true,
            data : {
                accessToken,
                refreshToken
            }
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function logoutController(request,response){
    try {

        const userId = request.userId

        const cookieOptions = {
            httpOnly : true,
            secure : true,
            sameSite : 'None'
        }

        response.clearCookie('accessToken', cookieOptions)
        response.clearCookie('refreshToken', cookieOptions)

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId,{ refresh_token: " "})


        return response.json({
            message : "Logout successfully",
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function uploadavatar(request,response){
    try {

        const userId = request.userId // auth middleware
        const image = request.file // multer middleware



        const upload = await uploadImageCloudinary(image)

        const updateUser = await UserModel.findByIdAndUpdate(userId,{ avatar : upload.url})

        return response.json({
            message: "Image uploaded successfully",
            data: {
                _id : userId,
                avatar : upload.url
            }
        })

        // console.log('image', image)


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//update user details
export async function updateUserDetails(request,response){
    try {
        const userId = request.userId // auth middleware (Only used by logged in user)
        const { name, email, mobile, password} = request.body

        let hashPassword = ""

        if(password){
            const salt = await bcryptjs.genSalt(10)
            hashPassword = await bcryptjs.hash(password,salt)
        }

        

        const updateUser = await UserModel.updateOne({_id : userId},{
            ...(name && {name: name}),
            ...(email && {email: email}),
            ...(mobile && {mobile: mobile}),
            ...(password && {password: hashPassword})
        })

        return response.json({
            message: "User updated successfully",
            error: false,
            success: true,
            data: updateUser
        })



    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }

}

//forgot the password


//refresh token controller
export async function refreshToken(request,response){
    try {
        const refreshToken = request.cookies.refreshToken || request?.header?.authorization?.split(" ")[1]
        

        if(!refreshToken){
            return response.status(401).json({
                message: "Invalid Token",
                error: true,
                success: false
            })
        }
        const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN)

        if(!verifyToken){
            return response.status(401).json({
                message: "Token is expired",
                error: true,
                success: false
            })
        }

        const userId = verifyToken?._id
        const newAcessToken = await generatedAccessToken(userId)
        const cookieOptions = {
            httpOnly : true,
            secure : true,
            sameSite : 'None'
        }

        response.cookie('accessToken',newAcessToken, cookieOptions)

        return response.json({
            message: "Token refreshed successfully",
            error: false,
            success: true,
            data: {
                accessToken: newAcessToken
            }
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
    })
}
}


