import './_categorySection.scss'
import {Container} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHook";
import {useContext, useEffect, useState} from "react";
import {fetchAllCategories} from "../../../../redux/slices/categoryReducer";
import {Link} from "react-router-dom";
import {ThemeContext} from "../../../ThemeContext";

const CategorySection = () => {
    const {darkMode} = useContext(ThemeContext)
    const categories = useAppSelector(state => state.categoriesReducer);
    const [offset, setOffset] = useState(5);
    const [finished, setFinished] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllCategories())
    }, [])

    const countCategories = () => {
        setOffset(offset => offset + 5)
        if(offset >= categories.length - 5) {
            setFinished(true)
        }
    }

    return (
        <section className={darkMode ? 'category category-dark' : 'category'}>
            <Container maxWidth='lg'>
                <h2>Shop by Category</h2>
                <div  className='category-wrap'>
                    <ul className="category-wrap_list">
                        {categories.map((item, i) => {
                            if(i < offset) {
                                return (
                                    <Link className='category-wrap_list-item' key={item.id} to={`/category/${item.name + item.id}`}>
                                        <img src={item.image} alt="category"/>
                                        <h4>{item.name}</h4>
                                    </Link>
                                )}
                            })
                        }
                    </ul>
                    {
                        !finished && <button
                            className='category-wrap_button'
                            onClick={() => {
                                countCategories()
                            }}
                        >Load More</button>
                    }
                    {
                        finished && <button
                            className='category-wrap_button'
                            onClick={() => {
                                setOffset(5)
                                setFinished(false)
                            }}
                        >Hide All</button>
                    }
                </div>
            </Container>
        </section>
    )
}

export default CategorySection