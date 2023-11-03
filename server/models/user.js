import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    availableMoney: { type: Number, default: 5000 },
    purchasedItems: [
        { type: Schema.Types.ObjectId, ref: "product", default: [] },
    ],
});

export const UserModel = model("user", UserSchema);