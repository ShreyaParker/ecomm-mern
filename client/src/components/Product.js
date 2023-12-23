import React, {useContext, useEffect, useState} from 'react';

import {ShopContext} from "../context/shopContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons/faStar";


const Product = ({product}) => {
    const { rating } = product;



    const {_id} = product

    const {addToCart,removeFromCart,getCartItemCount} = useContext(ShopContext)
    const count = getCartItemCount(_id)





    return (
        <div className="shadow rounded-xl m-6 w-32 sm:w-44 xl:w-96 flex items-center flex-col">
           <img src={product.imageurl} className="w-28 sm:w-32 xl:w-44  h-48 object-cover" />
            <h1 className={"font-bold"}>
               {product.productName}
           </h1>
            <span className={"font-light text-sm"}>
                {product.brand}
            </span>

            <h1>
                ${product.price}
            </h1>
            <i>
                {Array.from({ length: rating }, (_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} />
                ))}
            </i>
            <div className={"flex flex-row gap-2 border-2 border-cyan-500 rounded px-2"}>
                {

                    count > 0 &&
                    <div className={"flex flex-row gap-2"}><button onClick={()=>removeFromCart(_id)}>
                        -
                    </button> </div>
                }

                {
                    count > 0 && <p>{count}</p>
                }
                <button onClick={() => addToCart(_id)}>
                    {
                        count > 0  ? (<p> + </p>) : (<p>Add To Cart</p>)
                    }
                </button>
            </div>


        </div>
    );
};

export default Product;