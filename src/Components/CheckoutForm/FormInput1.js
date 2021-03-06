import React from 'react'
import {useForm} from 'react-hook-form'

export const FormInput1 = ({width,required,name,label,register,error,...inputProps}) => {
    //const {register,errors}=useForm();
    
    /* const error=errors.name;
    console.log(error); */
    //console.log(error);
    //const reg=register(registerobj);
    return (
        <>
            <div className={`${width} ${required===1?'required':''} ${error?'error':''} field `}>
                <label>{label}</label>
                <input  
                ref={register}
                name={name}
                {...inputProps}
                
                >
                </input>
                <span style={{color:'#a73a3d'}}>{error && error.message }</span>
            </div>
        </>
    )
}
