import axios from "axios";
import { useEffect, useState } from "react";

export const useGetProducts = () => {
    const [products, setProducts] = useState([]);

    const port = process.env.REACT_APP_PORT
    const fetchProducts = async () => {
        const products = await axios.get(`http://localhost:${port}/product`);
        setProducts(products.data.products);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return { products, fetchProducts };
};