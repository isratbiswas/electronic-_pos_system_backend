import ApiError from "../../errorHelpers/ApiError";
import { getProductAvailability } from "../../utils/getProductAvailability";
import { IProduct } from "./product.interface"
import { Product } from "./product.model"

const createProduct = async(payload:IProduct) =>{
    const existingProduct = await Product.findOne({name: payload.name})
     if (existingProduct) {
        throw new Error("A product with this name already exists.");
    }
    const product = await Product.create(payload)
    console.log(product, "product-5");
    if(!product){
       throw new ApiError(401, "This product not created.")
    }
    return product
}

const updateProduct = async(productId:string, payload:IProduct) =>{
      const product = await Product.findByIdAndUpdate(productId,payload, {new:true})
    if(!product){
       throw new ApiError(401, "This product not created.")
    }
    return product
}
const deleteProduct = async(productId : string) =>{
     console.log(productId,"mini");
     const product= await Product.findById(productId);
     console.log(product,"name");
     return product
}
const allProducts = async() =>{
     const products = await Product.find().sort({name:1})
     console.log(products,'data-1');
       const productsWithAvailability = products.map(product => ({
        ...product.toObject(),
        productAvailable: getProductAvailability(product.stock, product.productAvailable!)
    }));
      return productsWithAvailability;
}
const productDetails = async(productId:string) =>{
     const product= await Product.findById(productId);
     return product
}
const getLowOrOutOfStockProducts =  async () => {
    return await Product.find({
      status: { $in: ["low_stock", "out_of_stock"] },
    }).sort({ stock: 1 });
  }

export const ProductService = {
    createProduct,
    updateProduct,
    deleteProduct,
    allProducts,
    productDetails,
    getLowOrOutOfStockProducts
}