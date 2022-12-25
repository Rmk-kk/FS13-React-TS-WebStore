import {useParams} from "react-router-dom";
import {Container} from "@mui/material";

const CategoryPage = () => {
    const {category} = useParams();

    return (
        <Container maxWidth='lg'>
            <h2>{category}</h2>
        </Container>
    )
}

export default CategoryPage