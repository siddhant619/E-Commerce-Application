import React from 'react'
import {Elements, ElementsConsumer,CardElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Review from './Review'

const stripePromise=loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const PaymentForm = ({shippingData ,cart,prevStep}) => {
    console.log(cart);
    console.log(shippingData);
    const handleSubmit=async (event,elements, stripe)=>{
        event.preventDefault();
        console.log('form submitted');
        if(!stripe || !elements){
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
        }
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
                                    <button className={`ui primary ${!stripe?'disabled':''} button`}>Pay</button>
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
