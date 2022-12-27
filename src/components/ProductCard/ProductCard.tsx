import './productCard.scss'
import {ProductItem} from "../types-interfaces";
import {Link} from "react-router-dom";
const ProductCard = (props:ProductItem) => {
    const {title, price, description, images, category, id} = props;
    return (
        <div className='product-card'>
            <Link to={`/category/${category.name + category.id}/${id}`}>
                <div className="product-card-up">
                    <img className="img" src={images[0]} alt=""/>
                    <div className="img-info">
                        <div className="info-inner">
                            <span className="p-name">{title}</span>
                            <span className="p-company">{category.name}</span>
                        </div>
                        <div className="a-size">{description}</div>
                    </div>
                </div>
            </Link>
            <div className="box-down">
                <div className="h-bg">
                    <div className="h-bg-inner"></div>
                </div>

                <button className="cart-link">
                    <span className="price">${price}</span>
                    <span className="add-to-cart">
                        <span className="txt">Add to cart</span>
                    </span>
                </button>
            </div>
        </div>
    )
}

export default ProductCard