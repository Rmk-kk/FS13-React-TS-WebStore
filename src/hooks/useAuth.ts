import {useAppSelector} from "./reduxHook";

export const useAuth = () => {
    const user = useAppSelector(state => state.userReducer);
    return !!user;
}
