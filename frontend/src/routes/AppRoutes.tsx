import { Navigate, Route, Routes } from "react-router-dom"
import Page from "@/pages/Page"
import Inventory from "@/pages/Inventory"
import UploadProduct from "@/pages/UploadProduct"
import ProtectedRoute from "@/routes/ProtectedRoute"
import ExchangeHistory from "@/pages/ExchangeHistory"
import Login from "@/pages/Login"
import Product from "@/pages/Product"
import Register from "@/pages/Register"
import ReturnApi from "@/pages/ReturnApi"
import Search from "@/pages/Search"
import VerifyOtp from "@/pages/VerifyOtp"
import Admin from "@/components/Admin/Admin.tsx";
import AdminRoute from "@/routes/AdminRoute.tsx";
import Cart from "@/pages/Cart"
import Notification from "@/pages/Notification"

export const AppRoutes: React.FC = () => {
    return <>
        <Routes>
            <Route path="/">
                <Route index element={<Navigate to="/home" />} />
                <Route path="/home" element={<Page />} />
                <Route path="/exchange-history" element={<ExchangeHistory />} />
                <Route path="/login" element={<Login />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/register" element={<Register />} />
                <Route path="/return-api" element={<ReturnApi />} />
                <Route path="/search" element={<Search />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />

                <Route path="/notification" element={<ProtectedRoute><Notification /></ProtectedRoute>} />
                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
                <Route path="/uploadProduct" element={<ProtectedRoute><UploadProduct /></ProtectedRoute>} />

                <Route path="/admin" element={<AdminRoute><Admin/></AdminRoute>} />
            </Route>

            <Route path="*" element={<p className="text-center font-bold text-4xl">This page is not available :(</p>} />
        </Routes>
    </>
}