import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Search from "../components/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import CategoryPage from "../pages/CategoryPage";
import SubCategoryPage from "../pages/SubCategoryPage";
import ProductAdmin from "../pages/ProductAdmin";
import UploadProduct from "../pages/UploadProduct";
import AdminPermision from "../layouts/AdminPermision.jsx";
import ProductListPage from "../pages/ProductListPage.jsx";
import ProductDisplayPage from "../pages/ProductDisplayPage.jsx";
import CartMobile from "../pages/CartMobile.jsx";
import CheckoutPage from "../pages/CheckoutPage.jsx";
import Success from "../pages/Success.jsx";
import Cancel from "../pages/Cancel.jsx";
import MyOrders from "../pages/MyOrders.jsx";
import Address from "../pages/Address";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children : [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "search",
                element: <Search/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "register",
                element: <Register/>
            },
            {
                path: "forgot-password",
                element: <ForgotPassword/>
            },
            {
                path: "otp-verification",
                element: <OtpVerification/>
            },
            {
                path: "reset-password",
                element: <ResetPassword/>
            },
            {
                path : "user",
                element : <UserMenuMobile/>
            },
            {
                path : "dashboard",
                element : <Dashboard/>,
                children:
                [
                    {
                    path : "profile",
                    element : <Profile/>
                    },
                    {
                        path : "myorders",
                        element : <MyOrders/>
                    },
                    {
                        path : "address",
                        element : <Address/>
                    },
                    {
                        path: "category",
                        element: <AdminPermision><CategoryPage/></AdminPermision>
                    },
                    {
                        path: "subcategory",
                        element: <AdminPermision><SubCategoryPage/></AdminPermision>
                    },
                    {
                        path: "upload-product",
                        element: <AdminPermision><UploadProduct/></AdminPermision>
                    },
                    {
                        path: "product",
                        element: <AdminPermision><ProductAdmin/></AdminPermision>
                    }
                ]
            },
            {
                path : ":category/:categoryId",
                children : [
                    {
                        path : ":subCategory/:subCategoryId",
                        element : <ProductListPage />
                    }
                ]
            },
            {
                path : "product/:product",
                element : <ProductDisplayPage/>
            },
            {
                path : 'cart',
                element : <CartMobile/>
            },
            {
                path : 'checkout',
                element : <CheckoutPage/>
            },
            {
                path : "success",
                element : <Success/>
            },
            {
                path : 'cancel',
                element : <Cancel/>
            }

        ]
    }
]);

export default router;