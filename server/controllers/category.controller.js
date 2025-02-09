import CategoryModel from "../models/category.model.js";

export const AddCategoryController = async(request, response)=>{
    try {
        const { name, image} = request.body;

        if (!name || !image) {
            return response.status(400).send({
                message: "All input is required",
                error: true,
                success: false
            });
        }
        const payload = {
            name,
            image
        }

        const newcategory = await new CategoryModel(payload);
        const saveCategory = await newcategory.save();

        if(!saveCategory){
            return response.status(400).send({
                message: "Category not created",
                error: true,
                success: false
            });

        }
        return response.status(201).send({
            message: "Category created successfully",
            data: saveCategory,
            error: false,
            success: true
        })
        
    } catch (error) {
        response.status(500).json({ 
            message: error.message || "Some error occurred while creating the Category.",
            error: true,
            success: false
         });
    }

}

export const getCategoryController = async(request, response) =>{
    try {
        const categoryData = await CategoryModel.find();

        if(!categoryData){
            return response.status(400).send({
                message: "Category not found",
                error: true,
                success: false
            });
        }

        return response.status(200).send({
            message: "Category retrieved successfully",
            data: categoryData,
            error: false,
            success: true
        });
        
    } catch (error) {
        return response.status(500).send({
            message: error.message || "Some error occurred while retrieving Category.",
            error: true,
            success: false
        });
    }
}

export const updateCategoryController = async(request, response)=>{
    try {
        const { _id, name, image } = request.body

        const update = await CategoryModel.findByIdAndUpdate(_id , {
            name,
            image
        })

        return response.status(200).send({
            message: "Category updated successfully",
            data: update,
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).send({
            message: error.message || "Some error occurred while editing Category.",
            error: true,
            success: false
        });
    }
}

export const deleteCategoryController = async(request, response)=>{
    try {
        const { _id } = request.body
        
        const deleteCategory = await CategoryModel.deleteOne({_id : _id})

        return response.status(200).send({
            message: "Category deleted successfully",
            data: deleteCategory,
            error: false,
            success: true
        })
        
    } catch (error) {
        return response.status(500).send({
            message: error.message || "Some error occurred while deleting Category.",
            error: true,
            success: false
        });
    }
}