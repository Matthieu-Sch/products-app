import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  // création automatique des champs 'created_at' & 'updated_at'
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
