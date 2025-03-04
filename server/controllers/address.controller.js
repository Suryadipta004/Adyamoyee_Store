import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

export const addAddressController = async(request,response) =>{
    try {
    const userId = request.userId;
    const {address_line,city,state,pincode,country,mobile} = request.body;

    const createAddress = new AddressModel({
        address_line,
        city,
        state,
        pincode,
        country,
        mobile,
        userId: userId
    })

    const saveAddress = await createAddress.save();

    const addUserAddressId = await UserModel.findByIdAndUpdate(userId , {
        $push: {
            address_details : saveAddress._id
        }
    })

    return response.status(200).json({
        message : "Address added successfully",
        data: saveAddress,
        error: false,
        success: true
    })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error: true,
            success: false
        })
        
    }
}

export const getAddressController = async(request , response)=>{
    try {
        const userId = request.userId;
        
        const addressData = await AddressModel.find({userId: userId});
        
        return response.status(200).json({
            message : "Address fetched successfully",
            data: addressData,
            error: false,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error: true,
            success: false
        })
    }
}

export const updateAddressController = async(request,response)=>{
    try {
        const userId = request.userId;
        const { _id, address_line,city,state,country,pincode, mobile } = request.body

        const updateAddress = await AddressModel.findByIdAndUpdate(_id,{
            address_line,
            city,
            state,
            country,
            pincode,
            mobile
        })

        return response.status(200).json({
            message : "Address updated successfully",
            data: updateAddress,
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error: true,
            success: false
        })
        
    }
}

export const deleteAddresscontroller = async(request,response)=>{
    try {
        const userId = request.userId;
        const { _id } = request.body;

        const disableAddress = await AddressModel.updateOne({_id : _id, userId},{
            status : false
        })

        return response.status(200).json({
            message : "Address deleted successfully",
            data: disableAddress,
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error: true,
            success: false
        })
    }
}