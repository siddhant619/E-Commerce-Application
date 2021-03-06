import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import {CartContext} from '../../contexts/CartContext'

import './Cart.css'
const Cart = () => {
    /* function increaseCount(item){
      setCart(cart=>{
        return( [...cart,item] )
    })
    } */
    const [cart,setCart,changeItemCount,getTotalItems]=useContext(CartContext);

    let totalPrice=0,itemCount=0;
    const deliveryCharges=5;
    const renderedItems=cart.map(item=>{
      totalPrice+=item.price*item.count;
      itemCount+=item.count;
      return(
        <div className=" item" key={item.id}>
            <div className="ui tiny image" style={{border:"0px solid black"}}>
              <img src={item.imageURL} />
              <br></br>
              <div className="quantity-change">
                <i className={`icon  large minus circle ${item.count<=1?'disabled':''}`} 
                onClick={()=>{
                  if(item.count>1)
                    changeItemCount(item.id,item.count-1)
                }}></i>
                <div className="square">{item.count}</div>
                <i className="icon large plus circle" 
                onClick={()=>changeItemCount(item.id,item.count+1)}></i>
              </div>
            </div>
            <div className="content">
              <a className="header">{item.name}</a>
              <div className="meta">
                <span className="cinema">{item.description}</span>
              </div>
              <p className="header">${item.price*item.count}</p>
              <div className="extra">
                
              <button className="ui tiny negative basic button"
              onClick={()=>changeItemCount(item.id,0)}
              >Remove item</button>

              </div>
            </div>
          </div>

      )
    })
    return (
      <div className="ui grid container">
        <div className="ten wide column">
          <div className="ui divided scroll items">
            In cart- {renderedItems.length}
            {renderedItems}
          </div>
        </div>
        <div className="four wide column">
          {/* <div class="ui  header">Price details</div>
          <div class="ui divider"></div> */}
          <h4 className="ui horizontal divider header">
            <i className="tags icon"></i>
            Price details
          </h4>
          <p>Total({itemCount} Item{itemCount>1?'s':''}) :&nbsp; {totalPrice}</p>
          <p>Delivery Charges: {totalPrice>500?'FREE':`$${deliveryCharges}`}</p>
          <div className="ui  divider "></div>
          <p className="ui header">Total Amount: ${totalPrice>500?totalPrice:totalPrice+deliveryCharges}</p>
          <Link to="/checkout">
            <button className="fluid ui button">Place order</button>
          </Link>
        </div>
      </div>
    )
}

export default Cart
