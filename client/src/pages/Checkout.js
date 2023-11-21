import React, {useContext} from 'react';
import {useGetProducts} from "../hooks/useGetProducts";
import {ShopContext} from "../context/shopContext";
import CartItems from "../components/CartItems";

const Checkout = () => {
    const { products } = useGetProducts()
    const {getCartItemCount} = useContext(ShopContext)

    console.log(products)
    console.log(getCartItemCount)
    return (
        <div>
            <h1 className={"flex justify-center text-3xl font-bold"}>
                Your Cart Items
            </h1>

            <div>
                {
                    products.map((product)=>{
                        if(getCartItemCount(product._id) !== 0){
                            return(
                                <CartItems product={product}/>
                            )
                        }
                    })
                }

            </div>
        </div>

    );
};

export default Checkout;