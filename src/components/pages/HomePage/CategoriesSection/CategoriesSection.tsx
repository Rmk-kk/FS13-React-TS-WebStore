import './categories.scss'

import {Container} from "@mui/material";


const CategoriesSection = () => {
    const categories = ['All', 'Cloths','Shoes','Furniture','Electronics','Other'];
    const categoriesImg = ['#', '../img/intro/categories/cloths.webp', "../img/intro/categories/shoes.jpg", '../img/intro/categories/furniture.jpg', "../img/intro/categories/electronics.jpg"]
    return (
        <section className='categories'>
            <Container maxWidth='lg'>
                <h2>Categories</h2>
                <div  className='categories-wrap'>
                    <ul className="categories-wrap_list">
                        {categories.map((item,i )=> {
                            return <li style={{backgroundImage: `url(${categoriesImg[i]})`}} className="categories-wrap_list-item" key={item}>{item}</li>
                        })}
                    </ul>
                </div>
            </Container>
        </section>
    )
}

export default CategoriesSection