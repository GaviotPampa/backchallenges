import { ProductModel } from "./models/products.model.js";

export default class ProductDaoMongoDB {
  async getAllProducts() {
    try {
      const response = await ProductModel.find({});
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(productId) {
    try {
      const response = await ProductModel.findById(productId);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createProduct(obj) {
    try {
      const response = await ProductModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, obj) {
    try {
      const response = await ProductModel.findByIdAndUpdate({_id: id}, obj, { new: true });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

/**
 * 
 * @param {*} id 
 * @returns 
 */
  async deleteProduct(id) {
    try {
      const response = await ProductModel.findByIdAndDelete(id);
      return response;
    } catch (error) {}
  }

  async getProdPaginate(page = 1, limit=10) {
    try {
      const response = await ProductModel.paginate({},{page,limit} );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
