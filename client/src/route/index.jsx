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
                        path: "category",
                        element: <CategoryPage/>
                    },
                    {
                        path: "subcategory",
                        element: <SubCategoryPage/>
                    },
                    {
                        path: "upload-product",
                        element: <UploadProduct/>
                    },
                    {
                        path: "product",
                        element: <ProductAdmin/>
                    }
                ]

            }

        ]
    }
]);

export default router;