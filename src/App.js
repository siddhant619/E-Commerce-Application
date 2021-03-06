import React,{useState,useEffect} from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Products from './Components/Products'
import Navbar from './Components/Navbar'
import Cart from './Components/Cart/Cart'
import Checkout from './Components/CheckoutForm/Checkout/Checkout'
const App = () => {
    const [cart,setCart]=useState([]);
    useEffect(()=>{
        console.log('initial render');
        setCart(JSON.parse(localStorage.getItem("cart")) || [] );
    },[])

    useEffect(() => {
        console.log(cart);
        localStorage.setItem('cart',JSON.stringify(cart));
    }, [cart])
    //console.log('Rendered: ',cart);

    function changeItemCount(id,newCount){
        console.log('id= '+id,'Count= '+newCount);
        let newCart;
        if(newCount===0){
             newCart=cart.filter(item=>{
                 if(item.id===id) return(false);
                 return(true);
             })
        }
        else{
            newCart=[...cart];
            newCart.forEach(item => {
                if(item.id===id){
                    item.count=newCount
                }
            });
        }
        setCart(newCart);
    }
    function getTotalItems(){
        const count=cart.reduce((acc,item)=>{
            return(acc+item.count)
        },0);
        return(count);
    }
    return (<div>
                <div className="ui container">
                <Router>
                    <Navbar itemCount={getTotalItems()} />
                    <Switch>
                        <Route exact path="/">
                            <Products cart ={cart} setCart={setCart} />
                        </Route>
                        <Route path="/cart">
                            <Cart cart={cart} changeItemCount={changeItemCount} />
                        </Route>
                        <Route exact path="/checkout">
                            <Checkout cart={cart}/>
                        </Route>
                    </Switch>
                </Router>
                </div>
        </div>
    )
}

export default App
