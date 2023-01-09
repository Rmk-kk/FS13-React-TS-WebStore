import './_categorySection.scss'
import {Container} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHook";
import {useContext, useEffect} from "react";
import {fetchAllCategories} from "../../../../redux/slices/categoryReducer";
import {Link} from "react-router-dom";
import {ThemeContext} from "../../../ThemeContext";

const CategorySection = () => {
    const {darkMode} = useContext(ThemeContext)
    const categories = useAppSelector(state => state.categoriesReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAllCategories())
    }, [])

    return (
        <section className={darkMode ? 'category category-dark' : 'category'}>
            <Container maxWidth='lg'>
                <h2>Shop by Category</h2>
                <div  className='category-wrap'>
                    <ul className="category-wrap_list">
                        {categories.map(item => {
                            return (
                                <Link className='category-wrap_list-item' key={item.id} to={`/category/${item.name + item.id}`}>
                                    <img src={item.image} alt="category"/>
                                    <h4>{item.name}</h4>
                                </Link>
                            )})}
                    </ul>
                </div>

            </Container>
        </section>
    )
}

export default CategorySection