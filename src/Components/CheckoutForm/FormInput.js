import React from 'react'

export const FormInput = ({label,register,error,...inputProps}) => {
    //console.log(error);
    return (
        <>
            <label>{label}</label>
            <input  
            ref={register}
            {...inputProps}
            
            >
            </input>
            {error && error.message }
        </>
    )
}
