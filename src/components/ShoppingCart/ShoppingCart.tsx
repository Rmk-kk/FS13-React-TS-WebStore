import './shopping-cart.scss'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Link} from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React, {useState} from "react";
import {Fade} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHook";
import {CartProduct, removeItem} from "../../redux/slices/cartReducer";
const ShoppingCart = () => {
    const [showCart, setShowCart] = useState(false)
    const cart = useAppSelector(state => state.cartReducer);
    const dispatch = useAppDispatch();
    const toggleShoppingCart = () => {
        setShowCart(prev => !prev);
    }

    const elements = cart.length > 0 ? cart.map((item, i) => <ShoppingCartItem key={i} product={item}/>) : <p>Nothing was added yet</p>
    return (
        <>
            <ShoppingCartIcon className={showCart ? 'active-cart' : ''} onClick={()=>toggleShoppingCart()}/>
            <Fade in={showCart} mountOnEnter unmountOnExit>
                <div className='cart-wrap'>
                    <ul className='cart'>
                        {elements}
                    </ul>
                    <div className='cart-bottom_wrap'>
                        <div className="cart-total">Total: 199$</div>
                        <Link to={''} className='cart-checkout'>Checkout</Link>
                    </div>
                </div>
            </Fade>
        </>
    )
}

export default ShoppingCart

interface ShoppingCartItemProps {
    product: CartProduct
}
const ShoppingCartItem = (props:ShoppingCartItemProps) => {
    const dispatch = useAppDispatch();
    const {images, title, price,id, quantity} = props.product;

    return (
        <li className="cart-item">
            <img src={images[0]} alt="PLACEHOLDER"/>
            <div className="cart-item_content">
                <h3>{title}</h3>
                <span className='cart-item_content-price'>{price}$</span>
                <span className='cart-item_content-quantity'>Quantity: {quantity}</span>
            </div>
            <DeleteForeverIcon onClick={() => dispatch(removeItem(id))}/>
        </li>
    )
}