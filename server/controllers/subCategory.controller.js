import SubCategoryModel from '../models/subCategory.model.js'

export const AddsubCategoryController = async(request, response)=>{
    try {
        const {name,image,category} = request.body

        if(!name || !image || !category){
            return response.status(400).json({
                message : "Please fill all the fields",
                success : false
            })
        }

        const subCategory = new SubCategoryModel({
            name,
            image,
            category
        })

        const newSubCategory = await subCategory.save()

        return response.status(201).json({
            message : "Sub Category added successfully",
            success : true,
            data : newSubCategory
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message,
            success : false,
            error : error

        })
        
    }
}
export const getsubCategoryController = async(request, response)=>{
    try {
        const subCategory = await SubCategoryModel.find().populate('category')

        return response.status(200).json({
            message : "Sub Category fetched successfully",
            success : true,
            data : subCategory
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message,
            success : false,
            error : error

        })
        
    }
}
export const updatesubCategoryController = async(request, response)=>{
    try {
        const {_id, name , image , category} = request.body

        const checkSub = await SubCategoryModel.findById(_id)

        if(!checkSub){
            return response.status(404).json({
                message : "Sub Category not found",
                success : false
            })
        }

        const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(_id,{
            name,
            image,
            category
        })

        return response.status(200).json({
            message : "Sub Category updated successfully",
            success : true,
            data : updateSubCategory
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message,
            success : false,
            error : error

        })
        
    }
}
export const deletesubCategoryController = async(request, response)=>{
    try {
        const {_id} = request.body

        const deleteSub = await SubCategoryModel.findByIdAndDelete(_id)

        return response.status(200).json({
            message : "Sub Category deleted successfully",
            success : true,
            data : deleteSub
        })
        
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            success : false,
            error : error

        })
        
    }
}