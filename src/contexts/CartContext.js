import React,{createContext,useState,useEffect} from 'react'

export const CartContext = createContext();

export const CartProvider=(props)=>{
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
    return(
        <CartContext.Provider value={[cart,setCart,changeItemCount,getTotalItems]}>
            {props.children}
        </CartContext.Provider>
    )
}