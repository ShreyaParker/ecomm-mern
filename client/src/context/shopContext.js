import {createContext, useEffect, useState} from "react";
import {useGetProducts} from "../hooks/useGetProducts";
import axios from "axios";
import {useGetToken} from "../hooks/useGetToken";
import {useNavigate} from "react-router-dom";


export const ShopContext = createContext(null)
export const ShopContextProvider =(props)=> {
    const [cartItems, setCartItems] = useState({})


    const {products} = useGetProducts()
    const navigate = useNavigate()
    const [availableMoney,setAvailableMoney] = useState(0)

    const {headers} = useGetToken()
    const fetchAvailableMoney = async ()=>{
        const  port = process.env.REACT_APP_PORT
        try {
            const res = await axios.get(`http://localhost:${port}/user/available-money/${localStorage.getItem("userId")}`,
                {headers}
            )


            setAvailableMoney(res.data.availableMoney)

        } catch (e) {
            alert(
                e.message
            )
        }

    }
    useEffect(()=>{
        fetchAvailableMoney()
    },[])
    const getCartItemCount = (itemId) => {
        if (itemId in cartItems) {

            return cartItems[itemId]
        }


        return 0
    }


    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({...prev, [itemId]: 1}))
        } else {
            setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}))
        }
    }
    const removeFromCart = (itemId) => {
        if (!cartItems[itemId] && cartItems[itemId] === 0) return;
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}))

    }

    const updateCartItemCount = (newAmount, itemId) => {
        if (newAmount < 0) return;
        setCartItems((prev) => ({...prev, [itemId]: newAmount}))
    }
    const getTotalCartAmount = () => {
        let totalAmount = 0
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let ItemInfo = products.find((product) => product._id === item)

                totalAmount += cartItems[item] * ItemInfo.price
            }
        }

        return totalAmount;
    }




    const checkout = async () => {
        const body = {customerId : localStorage.getItem("userId"),cartItems}

        const  port = process.env.REACT_APP_PORT
        try {
            await axios.post(`http://localhost:${port}/product/checkout`, body,{
                headers
            });

            setCartItems({})
            fetchAvailableMoney()
            navigate("/")
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
        }
    }


    const contextValue = {
        checkout,
        addToCart,
        updateCartItemCount,
        removeFromCart,
        getCartItemCount,
        getTotalCartAmount,
        availableMoney


    };

    return(
     <ShopContext.Provider value={contextValue}>
         {props.children}
     </ShopContext.Provider >
    )
}