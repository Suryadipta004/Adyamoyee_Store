import { Router } from "express";
import auth from "../middleware/auth.js";
import { addToCardItemController, deleteCartItemQtyController, getCartItemController, updateCartItemsQtyController } from "../controllers/cart.controller.js";

const cartRouter = Router()

cartRouter.post('/create',auth,addToCardItemController)
cartRouter.get('/get',auth,getCartItemController)
cartRouter.put('/update-qty',auth,updateCartItemsQtyController)
cartRouter.delete('/delete-cart-item',auth,deleteCartItemQtyController)

export default cartRouter