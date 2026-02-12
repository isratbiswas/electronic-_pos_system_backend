import ApiError from "../../errorHelpers/ApiError";
import { getProductAvailability } from "../../utils/getProductAvailability";
import { productSearchableFields } from "./product.constant";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (payload: IProduct) => {
  console.log(Object.keys(Product.schema.paths));
  try {
    const existingProduct = await Product.findOne({ name: payload.name });
    if (existingProduct) {
      throw new Error("A product with this name already exists.");
    }

    const product = await Product.create(payload);
    console.log(product, "product-created");

    return product;
  } catch (error) {
    console.error("Product create error:", error);
    throw error;
  }
};

const updateProduct = async (productId: string, payload: IProduct) => {
  const product = await Product.findByIdAndUpdate(productId, payload, {
    new: true,
  });
  console.log(product, "up");
  if (!product) {
    throw new ApiError(401, "This product not created.");
  }
  return product;
};
const deleteProduct = async (productId: string) => {
  console.log(productId, "mini");
  const product = await Product.findByIdAndDelete(productId);
  console.log(product, "name");
  return product;
};
const allProducts = async (query: Record<string, string>) => {
  const filter = query;
  const searchTerm = query.searchTerm || "";
  delete filter["searchTerm"];

  const searchQuery = {
    $or: productSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  };
  const products = await Product.find(searchQuery).sort({ name: 1 });

  const productsWithAvailability = products.map((product) => ({
    ...product.toObject(),
    productAvailable: getProductAvailability(
      product.stock,
      product.productAvailable!,
    ),
  }));
  return productsWithAvailability;
};
const productDetails = async (productId: string) => {
  const product = await Product.findById(productId);
  return product;
};
const getLowOrOutOfStockProducts = async () => {
  return await Product.find({
    status: { $in: ["low_stock", "out_of_stock"] },
  }).sort({ stock: 1 });
};

export const ProductService = {
  createProduct,
  updateProduct,
  deleteProduct,
  allProducts,
  productDetails,
  getLowOrOutOfStockProducts,
};
