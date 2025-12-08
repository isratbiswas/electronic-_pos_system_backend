import { ProductAvailability } from "../modules/product/product.interface";


export const getProductAvailability= (stock:number, productAvailable: ProductAvailability) =>{
    if(stock <=0) return "OUT_OF_STOCK";
    if(stock<=5) return "LOW_STOCK";
    return "IN_STOCK"
}