import './shopping-cart.scss'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Link} from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React, {useState} from "react";
import {Fade, Slide} from "@mui/material";
const ShoppingCart = () => {
    const [shoppingCart, setShoppingCart] = useState(false)

    const toggleShoppingCart = () => {
        setShoppingCart(prev => !prev);
    }

    return (
        <>
            <ShoppingCartIcon className={shoppingCart ? 'active-cart' : ''} onClick={()=>toggleShoppingCart()}/>
            <Fade in={shoppingCart} mountOnEnter unmountOnExit>
                <div className='cart-wrap'>
                    <ul className='cart'>
                        <li className="cart-item">

                            <img src="#" alt="PLACEHOLDER"/>
                            <div className="cart-item_content">
                                <h3>Product name</h3>
                                <span className='cart-item_content-price'>199$</span>
                                <span className='cart-item_content-quantity'>Quantity: 2</span>
                            </div>
                            <DeleteForeverIcon/>
                        </li>
                        <li className="cart-item">

                            <img src="#" alt="PLACEHOLDER"/>
                            <div className="cart-item_content">
                                <h3>Product name</h3>
                                <span className='cart-item_content-price'>199$</span>
                                <span className='cart-item_content-quantity'>Quantity: 2</span>
                            </div>
                            <DeleteForeverIcon/>
                        </li>
                        <li className="cart-item">
                            <img src="#" alt="PLACEHOLDER"/>
                            <div className="cart-item_content">
                                <h3>Product name</h3>
                                <span className='cart-item_content-price'>199$</span>
                                <span className='cart-item_content-quantity'>Quantity: 2</span>
                            </div>
                            <DeleteForeverIcon/>
                        </li>
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