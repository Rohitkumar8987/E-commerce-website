import React from 'react'
import './cart.css'
import {AiOutlineClose} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Product from '../Product'
import { useAuth0 } from "@auth0/auth0-react";


const Cart = ({cart ,setCart}) => {
    const incqty =(Product)=>{
        const exsit = cart.find((x)=>
        {
            return x.id === Product.id
        })
        setCart(cart.map((curElm) =>{
            return curElm.id === Product.id?{...exsit,qty:exsit.qty+1}: curElm
        }))
    }
    const decqty =(Product)=>{
        const exsit = cart.find((x)=>
        {
            return x.id === Product.id
        })
        setCart(cart.map((curElm) =>{
            return curElm.id === Product.id?{...exsit,qty:exsit.qty-1}: curElm
        }))
    }
    
    const Totalprice = cart.reduce((price,item)=>price + item.qty * item.Price,0)
  return (
 <>
    <div className="cartconatiner">
    {
        cart.length === 0 &&
        <div className="emptycart">
        <h2 className='empty'> Cart is Empty</h2> 
        <Link to='/product'className='emptycartbtn' >Shop Now</Link>
        </div>
    }
        <div className="contant">
        {
            cart.map((curElm) =>
            {
                return(

                    <div className="cart_items" key={curElm.id}>
                        <div className="img_box">
                            <img src={curElm.Img} alt={curElm.Title} ></img>
                        </div>
                        <div className="detail">
                        <div className="info">
                            <h4>{curElm.cat}</h4>
                            <h3>{curElm.Title}</h3>
                            <p>Price: ${curElm.Price}</p>
                            <div className="qty">
                                <button className='incqty' onClick={()=>incqty(curElm)}>+</button>
                                <input type="text" value={curElm.qty} ></input>
                                <button className='decqty'onClick={()=>decqty(curElm)}>-</button>
                            </div>
                                <h4 className='subtotal'>sub total: ${curElm.Price *curElm.qty}</h4>
                            </div>
                            <div className="close">
                            <button onClick={()=> setCart(cart.filter(x => x !== curElm))}><AiOutlineClose/></button>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        </div>
        {
            cart.length > 0 &&
            <>
        <h2 className='totalprice'>TOTAL: $ {Totalprice}</h2>
            <button className='checkout' >Checkout</button>
            </>
        }
    </div>
 </>
  )
}

export default Cart
