import React,{useContext} from 'react'
import {Elements, ElementsConsumer,CardElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Review from './Review'
import {CartContext} from '../../contexts/CartContext'
import Conformation from './Conformation'
const stripePromise=loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({shippingData ,prevStep}) => {
    const [cart,setCart,changeItemCount,getTotalItems]=useContext(CartContext);

    console.log('In payment form',cart);
    console.log(shippingData);
    const handleSubmit=async (event,elements, stripe)=>{
        event.preventDefault();
        console.log('form submitted');
        return;
        //Backend to be integrated
        /* if(!stripe || !elements){
            return;
        }
        const cardElement = elements.getElement(CardElement);
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
          });

        
        if (error) {
            console.log('[error]', error);
        } else {
            
            console.log('[PaymentMethod]', paymentMethod);
            
        } */
    }
    const getTotalAmount=()=>{
        let totalPrice=0;
        cart.map(item=>{
            totalPrice+=item.price*item.count;
        });

        return(totalPrice);
    }
    return (
        <>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {
                        ({elements,stripe})=>(
                            <form onSubmit={ (e)=> handleSubmit(e,elements,stripe) }>
                                <CardElement />
                                <br></br>
                                <div style={{display:'flex',justifyContent:'space-between'}}>
                                    <button className="ui secondary basic button" onClick={prevStep}>Back</button>
                                    <button className={`ui primary ${!stripe?'disabled':''} disabled button`}>Pay &#8377;{getTotalAmount()}</button>
                                </div>
                            </form>
                        )
                    }
                </ElementsConsumer>
            </Elements>
        </>
    )
}

export default PaymentForm
