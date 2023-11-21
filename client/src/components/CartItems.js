import React, {useContext} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons/faStar";
import {ShopContext} from "../context/shopContext";

const CartItems = ({product}) => {
    const {_id} = product

    const {addToCart,removeFromCart,getCartItemCount} = useContext(ShopContext)
    const count = getCartItemCount(_id)
    return (

           <div className="shadow  rounded-xl m-6  w-12/14  flex  items-center flex-row">
               <img src={product.imageurl} className="w-28 sm:w-32 xl:w-44  h-48 object-cover" />


                       <h1 className={"font-bold text-3xl ml-auto"}>
                           {product.productName}
                       </h1>


                   <div className={"flex flex-row gap-2 border-2 ml-auto border-cyan-500 rounded px-4 text-center"}>
                       {

                           count > 0 &&
                           <div className={"flex flex-row gap-2"}><button onClick={()=>removeFromCart(_id)}>
                               -
                           </button> <p>{count}</p></div>
                       }
                       <button onClick={() => addToCart(_id)}>
                           {
                               count > 0  ? (<p> + </p>)  : (<p>Add To Cart</p>)
                           }
                       </button>
                   </div>

               <h1 className="ml-auto mx-4">
                   ${product.price}
               </h1>

           </div>
    );
};

export default CartItems;