import {useLocation, useParams} from "react-router-dom";
import {Container} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHook";


const CategoryPage = () => {
    const {category} = useParams();
    console.log(category)
    const productsList = useAppSelector(state => state.productReducer);
    console.log(productsList)
    return (
        <Container maxWidth='lg'>
            <h2>{category}</h2>
            {/*{products.map(item => {*/}
            {/*    return <h5 key={item.id}>{item.title}</h5>*/}
            {/*})}*/}
        </Container>
    )
}

export default CategoryPage