import {createContext, createRef, useState} from "react";


export const ShopContext = createContext(null)
export const ShopContextProvider =(props)=>{
    const [cartItems,setCartItems] = useState({})


    const getCartItemCount = (itemId) =>{
        if(itemId in cartItems){
            console.log(cartItems[itemId])
            return cartItems[itemId]
        }


        return 0
    }


    const addToCart = (itemId) =>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        } else {
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId] + 1}))
        }
    }
    const removeFromCart = (itemId)=>{
        if(!cartItems[itemId] && cartItems[itemId] === 0) return;
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId] - 1}))

    }

    const updateCartItemCount = (newAmount,itemId) => {

    }
    const contextValue = {
        addToCart,
        updateCartItemCount,
        removeFromCart,
        getCartItemCount
    };

    return(
     <ShopContext.Provider value={contextValue}>
         {props.children}
     </ShopContext.Provider >
    )
}