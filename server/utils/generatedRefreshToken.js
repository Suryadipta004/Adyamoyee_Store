import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import UserModel from '../models/user.model.js';

const generatedRefreshToken = async(userId) =>{
    const token = await jwt.sign(
            {id: userId},
            process.env.SECRET_KEY_REFRESH_TOKEN,
            {expiresIn: '7d'}
        )

    const updatedtoken = await UserModel.updateOne(
        { _id  : userId },
        { refresh_token : token }
    )

    return token
}

export default generatedRefreshToken;