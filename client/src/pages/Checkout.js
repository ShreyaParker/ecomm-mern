import React, {useContext} from 'react';
import {useGetProducts} from "../hooks/useGetProducts";
import {ShopContext} from "../context/shopContext";
import CartItems from "../components/CartItems";
import {useNavigate} from "react-router-dom";


const Checkout = () => {
    const { products } = useGetProducts()
    const {getCartItemCount,getTotalCartAmount,checkout} = useContext(ShopContext)
    const navigate= useNavigate()
    const totalAmount = getTotalCartAmount()


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
                                <CartItems key={product._id} product={product}/>
                            )
                        }
                        return null;
                    })
                }


            </div>
            {
                totalAmount > 0 ? (
                    <div className=" flex justify-center gap-2 font-bold  flex-col">
                        <h1 className="text-center">
                          SubTotal : ${totalAmount.toFixed(2)}

                        </h1>
                        <div className={"justify-center items-center flex flex-col"}>
                            <button onClick={()=> navigate("/")} >
                                Continue Shopping
                            </button>
                            <button onClick={checkout} className="bg-cyan-400 p-2 rounded-2xl">
                                Checkout

                            </button>
                        </div>

                    </div>
                ) : (
                    <h1>
                        Your Shopping cart is Empty
                    </h1>
                )
            }

        </div>

    );
};

export default Checkout;