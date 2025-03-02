import CartProductModel from '../models/cartProduct.model.js'
import UserModel from '../models/user.model.js'

export const addToCardItemController = async(request,response) =>{
    try {
        const userId = request.userId
        const {productId} = request.body

        if(!productId){
            return response.status(400).json({
                message : "Product id is required",
                success : false,
                error : true
            })
        }
        const checkItemCart = await CartProductModel.findOne({
            userId : userId,
            productId : productId
        })

        if(checkItemCart){
            return response.status(400).json({
                message : "Product is already in cart",
            })
        }

        const cartItem = new CartProductModel({
            quantity : 1,
            userId : userId,
            productId : productId
        })

        const save = await cartItem.save()//save to cart

        const updateCartUser = await UserModel.updateOne({ $push: { shopping_cart: productId } })

        return response.status(200).json({
            data : save,
            message : "Product added to cart",
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            success : false
        })
    }
}

export const getCartItemController = async(request,response) =>{
    try {
        const userId = request.userId 
        const cartItem = await CartProductModel.find({
            userId : userId
        })
        // .populate('productId')

        return response.status(200).json({
            data : cartItem,
            success : true,
            error : false
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}

export const deleteCartItemQtyController = async(request,response) =>{
    try {
        const userId = request.userId
        const {_id} = request.body

        if(!_id){
            return response.status(400).json({
                message : "Product id is required",
                success : false,
                error : true
            })
        }

        const deleteCartItem = await CartProductModel.deleteOne({
            _id : _id,
            userId : userId
        })

        return response.status(200).json({
            data : deleteCartItem,
            message : "Product deleted from cart",
            success : true,
            error : false
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}

export const updateCartItemsQtyController = async(request, response) =>{
    try {
        const userId = request.userId
        const {_id,quantity} = request.body

        if(!_id || !quantity){
            return response.status(400).json({
                message : "Product id and quantity is required",
                success : false,
                error : true
            })
        }

        const updateCartItem = await CartProductModel.updateOne({
            _id : _id,
            userId : userId
        },{
            quantity : quantity
        })

        return response.status(200).json({
            data : updateCartItem,
            message : "Product updated",
            success : true,
            error : false
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            success : false,
            error : true    
        })
    }
} 