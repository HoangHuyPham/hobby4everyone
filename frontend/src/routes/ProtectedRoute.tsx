import Cookies from 'js-cookie';
import { ReactNode } from 'react';
import { Navigate } from 'react-router';

const ProtectedRoute: React.FC<{children: ReactNode}> = ({children})=>{
    const token = Cookies.get("token")

    if (!token){
        return <Navigate to="/login" />
    }

    return children
}

export default ProtectedRoute