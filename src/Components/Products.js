import React,{useContext} from 'react'
import Product from './Product'
import './Product.css'
import {CartContext} from '../contexts/CartContext'

const products=[
    {
        id:1,
        name:"Kettle",
        price:100,
        description:"kettle asdf fafa sdc",
        imageURL:"https://source.unsplash.com/T7RsH5wN4ng/1600x1500"
    },
    {
        id:2,
        name:"Coffee",
        price:60,
        description:"coffee sdf  asdfawef we fwe",
        imageURL:"https://source.unsplash.com/zwQTkDfzWS0/1600x1500"
    },
    {
        id:3,
        name:"Lamp",
        price:100,
        description:"kettle asdf fafa sdc",
        imageURL:"https://source.unsplash.com/VDPauwJ_sHo/1600x1500"
    }, 
    {
        id:4,
        name:"Laptop",
        price:6000,
        description:"sd dsf asf a sf",
        imageURL:"https://source.unsplash.com/RSCirJ70NDM/1600x1500"
    },
    {
        id:5,
        name:"Bag",
        price:90,
        description:"dsf f awe fawe fwefwe fw",
        imageURL:"https://source.unsplash.com/_H0fjILH5Vw/1600x1500"
    },
    {
        id:6,
        name:"Book",
        price:20,
        description:"dsf fsdv sd awe fawe fwefwe fw",
        imageURL:"https://source.unsplash.com/zlFOerO7xeE/1600x1500"
    },

]
const Products = () => {
    const [cart,setCart,changeItemCount,getTotalItems]=useContext(CartContext);

    //inCartIds stores all the ids of items that are in the cart
    const inCartIds=cart.map(item=>{
        return(item.id);
    })
    console.log('in cart',inCartIds);
    const renderedProducts=products.map(product=>{
        return(<div key={product.id} className="four wide menu column">
                <Product  product={product} inCart={inCartIds.includes(product.id)} //inCart===true means product already in cart so disable adding it again
                
                />
        </div>
        )
    } )
    return (
        <div className="ui centered stackable grid">
            {renderedProducts}
        </div>
    )
}

export default Products
