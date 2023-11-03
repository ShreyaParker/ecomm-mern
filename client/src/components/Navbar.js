import React from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    return (
        <div className={"bg-cyan-400 p-4 flex flex-row "}>
            <div>
                <h1>
                    Ecommerce
                </h1>
            </div>
            <div className="ml-auto flex gap-2">
                <Link to="/auth" ><FontAwesomeIcon icon={faUser}/></Link>
                <Link to="/purchase-items" >Purchase</Link>
                <Link to="/checkout" >
                    <FontAwesomeIcon icon={faShoppingCart} />
                </Link>
            </div>

        </div>
    );
};

export default Navbar;