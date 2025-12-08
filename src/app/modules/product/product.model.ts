import { model, Schema } from "mongoose";
import { IProduct, ProductAvailability } from "./product.interface";


const productSchema = new Schema<IProduct>({
    name: {type:String, required: true},
    category: {type: String, required: true},
    purchasePrice: {type:Number, required: true},
    stock: {type:Number, required: true, default: 0},
    productAvailable:{type:String, enum:Object.values(ProductAvailability), default: ProductAvailability.IN_STOCK },
    barcode: {type:String},
    // description: {type:String}
    // images: {type: String}
},
{timestamps:true})

//static method 
productSchema.statics.sell = async function (productId, quantity) {
    const product = await this.findById(productId)
    if(!product){
        throw new Error("Product not Found")
    }
    if(product.stock < quantity){
        throw new Error('Not enough stock available');
    }
    product.stock -= quantity;
    if(product.stock === 0){
        product.stock = ProductAvailability.OUT_OF_STOCK
    }
    await product.save();
    return product
}

export const Product = model<IProduct>("Product", productSchema)