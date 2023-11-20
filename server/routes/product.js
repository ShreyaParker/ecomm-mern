import {Router} from "express";
import {ProductModel} from "../models/products.js";
import {verifyToken} from "./user.js";
import {UserModel} from "../models/user.js";

const router= Router()

router.get("/",async (req,res)=>{
    try{
        const products = await ProductModel.find({})
        res.json({products})

    } catch (e) {
        res.status(400).json({message:e.message})
    }

})

router.post("/checkout",verifyToken,async (req,res)=>{
    const {customerID,cartItems}= req.body;
    try {
        const user = await UserModel.findById(customerID);

        const productIDs = Object.keys(cartItems);
        const products = await ProductModel.find({ _id: { $in: productIDs } });

        if (!user) {
            return res.status(400).json({ type: ProductErrors.NO_USERS_FOUND });
        }
        if (products.length !== productIDs.length) {
            return res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND });
        }

        let totalPrice = 0;
        for (const item in cartItems) {
            const product = products.find((product) => String(product._id) === item);
            if (!product) {
                return res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND });
            }

            if (product.stockQuantity < cartItems[item]) {
                return res.status(400).json({ type: ProductErrors.NOT_ENOUGH_STOCK });
            }

            totalPrice += product.price * cartItems[item];
        }

        if (user.availableMoney < totalPrice) {
            return res.status(400).json({ type: ProductErrors.NO_AVAILABLE_MONEY });
        }

        user.availableMoney -= totalPrice;
        user.purchasedItems.push(...productIDs);

        await user.save();
        await ProductModel.updateMany(
            { _id: { $in: productIDs } },
            { $inc: { stockQuantity: -1 } }
        );

        res.json({ purchasedItems: user.purchasedItems });

    } catch (e){
        res.status(400).json({message:e.message})

    }
})

export { router as productRouter}