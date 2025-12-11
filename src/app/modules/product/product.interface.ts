
export enum ProductAvailability {
    IN_STOCK= "IN_STOCK",
    OUT_OF_STOCK= "OUT_OF_STOCK",
    LOW_STOCK= "LOW_STOCK"
}
export  interface IProduct {
    name:string;
    category: string;
    purchasePrice:number;
    stock:number;
    barcode?:string;
    productAvailable?: ProductAvailability;
    // description: string;
    // images?: string
}