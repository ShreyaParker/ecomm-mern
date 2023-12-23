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

router.post("/checkout",async (req,res)=>{
    const { customerId, cartItems } = req.body;
    try {
        console.log(customerId)
        const user = await UserModel.findOne({ _id: customerId });
        console.log(user);

        const productIDs = Object.keys(cartItems);
        const products = await ProductModel.find({ _id: { $in: productIDs } });

        if (!user) {
            return res.status(400).json({ message: "No user found." });
        }
        if (products.length !== productIDs.length) {
            return res.status(400).json({ message: "No product found." });
        }

        let totalPrice = 0;
        for (const item in cartItems) {
            const product = products.find((product) => String(product._id) === item);
            if (!product) {
                return res.status(400).json({ message:"no product2" });
            }

            if (product.stockQuantity < cartItems[item]) {
                return res.status(400).json({ message:"no product3"  });
            }

            totalPrice += product.price * cartItems[item];
        }

        if (user.availableMoney < totalPrice) {
            return res.status(400).json({ message:"no product4 "  });
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