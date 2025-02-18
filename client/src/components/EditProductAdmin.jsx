import React, { useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../utils/UploadImage';
import Loading from '../components/Loading';
import ViewImage from '../components/ViewImage';
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux'
import { IoClose } from "react-icons/io5";
import AddFieldComponent from '../components/AddFieldComponent';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import successAlert from '../utils/SuccessAlert';
import { useEffect } from 'react';

const EditProductAdmin = ({fetchProductData,data,close}) => {
    const[productData , setProductData] = useState({
        _id : data._id,
        name: data.name,
        image: data.image,
        category: data.category,
        subCategory: data.subCategory,
        unit: data.unit,
        stock: data.stock,
        price: data.price,
        discount: data.discount,
        description: data.description,
        more_details: data.more_details || {}
    })




  return (
    <section>

    </section>
  )
}

export default EditProductAdmin