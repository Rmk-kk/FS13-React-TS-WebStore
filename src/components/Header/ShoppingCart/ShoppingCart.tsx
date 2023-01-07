import './shopping-cart.scss'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Link} from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React, {useContext, useState} from "react";
import {Button, Fade} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHook";
import {addItem, CartProduct, permanentlyDeleteItem, removeItem, resetCart} from "../../../redux/slices/cartReducer";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import {ThemeContext} from "../../ThemeContext";

const ShoppingCart = () => {
    const [showCart, setShowCart] = useState(false);
    const {darkMode} = useContext(ThemeContext)
    const dispatch = useAppDispatch();
    const cart = useAppSelector(state => state.cartReducer);
    const toggleShoppingCart = () => {
        setShowCart(prev => !prev);
    }

    //calculate cart total amount
    const cartTotal = () => {
        let total = 0;
        cart.forEach(item => {
            total = item.price * item.quantity + total;
        })
        return total
    }


    const elements = cart.length > 0 ? cart.map((item, i) => <ShoppingCartItem key={i} product={item}/>) : <p className='empty-cart'>Nothing was added yet</p>
    return (
        <>
            <ShoppingCartIcon className={showCart ? 'active-cart' : ''}
                              onClick={()=>toggleShoppingCart()}
            />
            <Fade in={showCart} mountOnEnter unmountOnExit>
                <div className={darkMode ? 'cart-wrap cart-wrap-dark' : 'cart-wrap'}>
                    <CloseIcon className='cart-wrap_close' fontSize='large' onClick={()=>setShowCart(false)}/>
                    <ul className='cart'>
                        {elements}
                    </ul>
                    <div className='cart-bottom_wrap'>
                        <div className="cart-total">Total:<span>{cartTotal()}</span>$</div>
                        <div className='cart-bottom_wrap-buttons'>
                            <Button disabled={cart.length === 0}
                                    variant="outlined" size='small'
                                    style={{marginRight: '15px'}}
                                    onClick={()=>dispatch(resetCart())}
                            >Clear cart</Button>
                            <Link to='/checkout'
                                  onClick={()=>setShowCart(false)}
                                  className={`${cart.length === 0 && 'disabled-cart_link'} cart-checkout`} >Checkout</Link>
                        </div>
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
                <div className='cart-item_content-price'>{price}<span>$</span></div>
                <div className='cart-item_content-quantity'>Quantity: <span>{quantity}</span>
                <span className='cart-item_content-arrows'>
                    <ArrowDropUpIcon fontSize='medium' onClick={()=> {
                        dispatch(addItem(props.product))
                    }}/>
                    <ArrowDropDownIcon fontSize='medium' onClick={()=> dispatch(removeItem(id))}/>
                </span>
                </div>
            </div>
            <DeleteForeverIcon onClick={() => dispatch(permanentlyDeleteItem(id))}/>
        </li>
    )
}