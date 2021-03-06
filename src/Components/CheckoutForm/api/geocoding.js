import axios from 'axios'

export default axios.create({
    baseURL:'https://maps.googleapis.com/maps/api/geocode/json',
    parameters:{
        key:process.env.REACT_APP_GOOGLE_API_KEY
    }

})