import './checkout.scss'
import {Container} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {addItem, removeItem} from "../../../redux/slices/cartReducer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


const CheckoutPage = () => {
    return (
        <Container maxWidth='lg'>
            <div className="checkout">
                <div className="checkout_products">
                    <h1>Checkout</h1>
                    <ul className='checkout_products-list'>
                        <li className='checkout_products-list_item'>
                            <img src="https://api.lorem.space/image/shoes?w=640&h=480&r=7377" alt="product"/>
                            <div className='list_item-content'>
                                <div className='list_item-content-text'>
                                    <h3>Elegant Soft Fish</h3>
                                    <h4>Shoes</h4>
                                    <p>The automobile layout consists of a front-engine design, with transaxle-type
                                        transmissions mounted at the rear of the engine and four wheel drive</p>
                                    <div style={{display: 'flex', justifyContent: 'space-around', alignContent: 'center'}}>
                                        <h5>Quantity: 3</h5>
                                        <h5>Price: 75$</h5>
                                    </div>
                                </div>
                                <div className='list_item-content-buttons'>
                                    <div>
                                        <ArrowDropUpIcon style={{marginBottom: '15px', marginRight: '10px'}} fontSize='large'/>
                                        <ArrowDropDownIcon fontSize='large'/>
                                    </div>
                                    <DeleteForeverIcon fontSize='large'/>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="checkout_payment">
                    <h2>Hello, Roman!</h2>
                </div>
            </div>
        </Container>
    )
}

export default CheckoutPage