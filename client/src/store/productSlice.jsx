import {createSlice} from '@reduxjs/toolkit';

const initialValue = {
    allCategory : [],
    loadingCategory : false,
    allSubCategory: [],
    product:[]
}

const productSlice = createSlice({
    name : 'product',
    initialState : initialValue,
    reducers : {
        setAllCategory(state,action){
            state.allCategory = [...action.payload]
        },
        setAllSubCategory(state,action){
            state.allSubCategory = action.payload
        },
        setProduct(state,action){
            state.product = action.payload
        },
        setLoadingCategory : (state,action)=>{
            state.loadingCategory = action.payload
        },
    }
})

export const {setAllCategory,setAllSubCategory,setProduct,setLoadingCategory} = productSlice.actions

export default productSlice.reducer