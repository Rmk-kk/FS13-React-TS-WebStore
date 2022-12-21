import './categories.scss'

import {Container} from "@mui/material";


const Categories = () => {
    const categories = ['All', 'Clothes','Shoes','Furniture','Electronics','Other'];
    return (
        <section className='categories'>
            <Container maxWidth='lg'>
                <h2>Categories</h2>
                <div  className='categories-wrap'>
                    <ul className="categories-wrap_list">
                        {categories.map(item => {
                            return <li className="categories-wrap_list-item" key={item}>{item}</li>
                        })}
                    </ul>
                </div>
            </Container>
        </section>
    )
}

export default Categories