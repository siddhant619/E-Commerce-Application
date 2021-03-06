import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = ({itemCount}) => {
    return (
        <div className="ui huge menu">
            <Link to="/">
                <a className=" header item">E-CommApp</a>
            </Link>
            <div className="right menu">
                <Link to="/cart">
                    <a className="item">
                        MyCart({itemCount}) &nbsp;
                        <i className="cart icon"></i>
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default Navbar
