import { Route, Routes } from "react-router"
import { ProductManage, Home } from "../pages"

export const AppRoutes: React.FC = () => {
    return <>
        <Routes>
            {/* Public Route  */}
            <Route>
                <Route index element={<Home/>} />
            </Route>

            {/* User Routes */}
            <Route path="/profile">
                <Route path="products" element={<ProductManage />} />
            </Route>

            {/* Private Route  */}
            <Route path="/admin">
            </Route>

            <Route path="*" element={<p className="text-center font-bold text-4xl">This page is not available :(</p>}/>
        </Routes>
    </>
}