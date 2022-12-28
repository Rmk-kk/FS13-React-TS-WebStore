import {useAuth} from "../../../hooks/isAuth";
import {Navigate, Outlet, useLocation} from "react-router-dom";

const ProtectedRoutes = () => {
    const location = useLocation();
    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Navigate to={'/account/login'} replace state={{from: location}}/>
}

export default ProtectedRoutes