import React from 'react';
import {useGetProducts} from "../hooks/useGetProducts";
import Product from "../components/Product";
import product from "../components/Product";

const Homepage = () => {
    const { products } = useGetProducts()

    return(
        <div>
            {
                products.map((product)=>(
                    <Product product={product} key={product._id}/>

                ))
            }

        </div>
    )
};

export default Homepage;