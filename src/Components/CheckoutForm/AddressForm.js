import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'

import {FormInput} from './FormInput'
import {FormInput1} from './FormInput1'
import geocoding from './api/geocoding'

const AddressForm = ({next}) => {
    const [state,setState]= useState('');
    const [region,setRegion]=useState('');


    const { register, errors, handleSubmit, setValue } = useForm({
        mode:'onBlur'
    });
    const onSubmit = data => {
        //console.log(data);
        next({...data});
    }
    //console.log('error pin ',errors.pin);
    const search=async (term)=>{
        try{
            //console.log(term);
            const response=await axios.get(`https://api.postalpincode.in/pincode/${term}`);
            console.log(response);
            if(response.data[0].Status==="Error"){
                setState('');
                setRegion('No location found');
                
            }
            else{
                setState(response.data[0].PostOffice[0].State);
                setRegion(response.data[0].PostOffice[0].District);
                
            }

        }
        catch(e){
            //console.log(e);
            setState('');
            setRegion('No location found');
        }
    }
    const handlePinChange=(e)=>{
        if(e.target.value.length===6){
            search(e.target.value);
        }
        else{
            setState('');
            setRegion('');
        }
    }
    const validatePin=()=>{
        if(region==='No location found'){
            //console.log('no loc found');
            return 'PIN not found'
        }
        return true;
    }
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
    const getLocation=async (lat,long)=>{
        try{
            //const response=await geocoding.get(`?latlng=${lat},${long}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
            //const response= await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
            
            //FIXING CORS ERROR- https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9
            const response= await axios.get(` https://secret-ocean-49799.herokuapp.com/https://apis.mapmyindia.com/advancedmaps/v1/${process.env.REACT_APP_MYMAPINDIA_KEY}/rev_geocode?lat=${lat}&lng=${long}`);
            if(response.data.responseCode===200){
                setValue('pincode',response.data.results[0].pincode);
                setValue('locality',`${response.data.results[0].city} ${response.data.results[0].state}`);
                setValue('address',response.data.results[0].formatted_address);
            }
            console.log(response);
        }
        catch(e){
            console.log(`[ERROR]`+e);
        }
        
    } 
    function success(pos) {
        var crd = pos.coords;
        
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        //NOW WE GOT LAT AND LONG. NOW USE REVERSE GEOCODING TO GET ADDRESS DETAILS
        getLocation(crd.latitude,crd.longitude); 

    }
    
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    const setLocation=()=>{
        setValue('pincode','101');
        setValue('locality','../');
        setValue('address','../');
        navigator.geolocation.getCurrentPosition(success, error, options);
    }
    return (
        <div className="ui form">
            <h4 className="ui dividing header">Shipping Information</h4>
            <div className=" fields">
                {/* <div className="ten wide required field">
                     <FormInput 
                        type="text" name="name" placeholder="Enter Name"
                        label='Name'
                        register={register({
                            pattern:{
                                value:/^[a-zA-Z ]+$/,
                                message:"Enter valid name"
                            },
                            required:{
                                value:true,
                                message:"Required!"
                            }
                        })}
                        error={errors.name}
                        
                    />
                    
                </div> */}
                <FormInput1 
                        width="ten wide" required={1} type="text" name="name" placeholder="Enter Name"
                        label='Name'
                        register={register({
                            pattern:{
                                value:/^[a-zA-Z ]+$/,
                                message:"Enter valid name"
                            },
                            required:{
                                value:true,
                                message:"Required!"
                            }
                        })}
                        error={errors.name}
                        
                    />
                {/* <div className="five wide required field">
                    
                    <FormInput 
                        type="text" name="phone" placeholder="10-digit mobile number"
                        label="Phone No."
                        register={register({
                            pattern:{
                                value:/^[0-9]{1}$/,
                                message:"Enter valid number"
                            },
                            
                            required:{
                                value:true,
                                message:"Required!"
                            }
                        })}
                        error={errors.phone}
                    />
                </div> */}
                <FormInput1 
                        width="five wide" required={1} type="text" name="phone" placeholder="10-digit mobile number"
                        label="Phone No."
                        register={register({
                            pattern:{
                                value:/^[0-9]{1}$/,
                                message:"Enter valid number"
                            },
                            
                            required:{
                                value:true,
                                message:"Required!"
                            }
                        })}
                        error={errors.phone}
                    />
            </div>
            <div className="field">
               <button class="ui primary button" onClick={setLocation}>
                    <i class="map marker alternate icon"></i>
                    Get current location
                </button>
               
            
            </div>
            <div className="fields">
                {/* <div className="four wide required field">
                    
                    <FormInput 
                        type="text" name="pincode" placeholder=""
                        label="Pincode" onChange={handlePinChange}
                        register={register({
                            pattern:{
                                value:/^[0-9]{6}$/,
                                message:"Enter valid pin"
                            },
                            
                            required:{
                                value:true,
                                message:"Required!"
                            }
                        })}
                        error={errors.pincode}
                    />
                    
                </div> */}
                <FormInput1
                        width="four wide" required={1}  type="text" name="pincode" placeholder=""
                        label="Pincode" onChange={handlePinChange}
                        register={register({
                            pattern:{
                                value:/^[0-9]{6}$/,
                                message:"Enter valid pin"
                            },
                            
                            required:{
                                value:true,
                                message:"Required!"
                            },
                            validate:validatePin
                        })}
                        error={errors.pincode}
                    />
                <div className="ten wide field">
                   
                    <FormInput 
                        type="text" name="locality" placeholder="lokation"
                        label="Locality" readOnly value={`${region} ${state}`}
                        register={register}
                        error={errors.locality}
                    />
                   
                </div>
            </div>
            <div className="field">
            
                <label>Address</label>
                <textarea rows="3" name="address" placeholder="Address(Area and street)" ref={register}></textarea>
                
            </div>
            <div class="ui fluid secondary submit button" onClick={handleSubmit(onSubmit)}>Submit</div>

        </div>
    )
}

export default AddressForm
