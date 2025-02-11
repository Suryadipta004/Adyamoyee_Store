import { Router } from 'express'
import auth from '../middleware/auth.js'
import { AddsubCategoryController, getsubCategoryController,updatesubCategoryController,deletesubCategoryController } from '../controllers/subCategory.controller.js'

const subCategoryRouter = Router()

subCategoryRouter.post('/add-category',auth,AddsubCategoryController)
subCategoryRouter.get('/get',getsubCategoryController)
subCategoryRouter.put('/update',auth,updatesubCategoryController)
subCategoryRouter.delete('/delete',auth,deletesubCategoryController)




export default subCategoryRouter