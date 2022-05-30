import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';

const Cart = () => {
    const cartRef = useRef();
    const { totalPrice, totalQuatities, cartItems, setshowCart } = useStateContext();
    return (
        <div className = "cart-wrapper" ref={cartRef}>
            <div className = "cart-container">
                <button className = "cart-heading"
                type = "button"
                onClick= {() => setshowCart(false)}
                >
                    <AiOutlineLeft />
                    <span className = "heading"> Your Cart</span>
                    <span className = "cart-num-items">({totalQuatities}items)</span>
                </button>
                {cartItems.length < 1 && (
                    <div className="empty-cart">
                        <AiOutlineShopping size = {150} />
                        <h3>Cart is empty.</h3>
                        <Link href = "/">
                            <button type="button"
                                onClick={() => setshowCart(false)}
                                className = "btn"
                            >
                                Continue Shopping
                            </button>
                        </Link>
                    </div>   
                )}
                <div className="product-container">
                    {cartItems.length >= 1 && cartItems.map((item, index) =>(
                        <div className="product" key = {item._id}>
                            <img src={urlFor(item?.image[0])} 
                            className="cart-product-image"
                            />
                            <div className="item-desc">
                                <div className = "flex top">
                                    <h5>{item.name}</h5>
                                    <h4>${item.price}</h4>

                                </div>
                                <div className = "flex bottom">
                                    <div>
                                    <p className = "quantity-desc">
                                        <span className = "minus"
                                            >
                                        <AiOutlineMinus />
                                        </span>
                                        <span className = "num">
                                            0
                                        </span>
                                        <span className = "plus"
                                            >
                                        <AiOutlinePlus />
                                        </span>
                                    </p>
                                    </div>
                                    <button type= "button"
                                        className ="remove-item"
                                        onClick=""
                                    >
                                        <TiDeleteOutline />
                                    </button>
                                </div>  
                            </div>
                        </div>
                    ))}

                </div>
                {cartItems.length >= 1 && (
                    <div className="cart-bottom">
                        <div className="total">
                            <h3>Subtotal: </h3>
                            <h3>${totalPrice}</h3>
                        </div>
                        <div className="btn-container">
                            <button type="button" className="btn" onClick="">
                                Pay with Stripe
                            </button>
                        </div>
                    </div>   
                )}
            </div>
        </div>
    )
}

export default Cart