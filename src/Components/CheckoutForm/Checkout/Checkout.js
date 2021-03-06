import React , {Fragment, useState} from 'react'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'

const Checkout = ({cart}) => {
    const [activeStep, setActiveStep]=useState(0);
    const [shippingData, setShippingData]=useState({});
    
    //console.log(shippingData);
    const nextStep=()=>{
        setActiveStep(prevActiveStep=>prevActiveStep+1);
    }
    const prevStep=()=>{
        setActiveStep(prevActiveStep=>prevActiveStep-1);
    }
    const next=(data)=>{
        setShippingData(data);
        //console.log(data.name); wont give correct state immediately after setting the state!
        nextStep();
    }

    const Form=()=>{
        
            return(activeStep===0?<AddressForm next={next}/>:<PaymentForm prevStep={prevStep} cart={cart} shippingData={shippingData}/>);
        
    }
    return (
        <div>
            <div className="ui hidden section divider"></div>
            <div className="ui one column centered page grid" style={{border:"1px solid black"}}>
                <div className="column nine wide" style={{backgroundColor:"white"}}>
                    <div className="ui center aligned header">Checkout</div>
                    <div class="ui two steps mini">
                        <div class={activeStep===0?'active step':'step'} >
                            <i class="shipping fast icon"></i>

                            <div class="content">
                                <div class="title">Shipping address</div>
                            </div>
                        </div>
                        <div class={activeStep===1?'active step':'step'}>
                            <i class="payment icon"></i>
                            <div class="content">
                            <div class="title">Payment details</div>
                            </div>
                        </div>
                    </div>
                    {<Form />}
                </div>
            </div>
        </div>
    )
}

export default Checkout
