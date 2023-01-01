import {useAuth} from "../../hooks/isAuth";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Navigate to={'/account/login'} replace/>
}

export default ProtectedRoutes