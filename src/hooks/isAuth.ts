import {useAppSelector} from "./reduxHook";

export const useAuth = () => {
    const token = useAppSelector(state => state.tokenReducer);
    return !!token;
}
