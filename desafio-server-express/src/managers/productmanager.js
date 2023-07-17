import fs from "fs";

export default class ProductsManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }
  //metodo para leer los productos
  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const product = await fs.promises.readFile(this.path, "utf-8");
        const productsJs = JSON.parse(product);
        return productsJs;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  #getMaxId() {
    let maxId = 0;
    this.products.map((product) => {
      if (product.id > maxId) maxId = product.id;
    });
    return maxId;
  }

  getProducts() {
    return this.products;
  }

  async addProduct(product) {
    try {
      const productsFile = await this.getProducts();
      productsFile.push({ ...product, id: this.#getMaxId() + 1 });
      await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const productsFile = await this.getProducts();
      const product = productsFile.find((product) => product.id === id);

      if (product) {
        return product;
      } else {
        false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(product, id) {
    try {
      const productsFile = await this.getProducts();
      const index = productsFile.findIndex((product) => product.id === id);
      if (index === -1) {
        throw new Error("Id not found");
      } else {
        productsFile[index] = { ...product, id };
      }
      await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProduct(id) {
    try {
      const productsFile = await this.getProducts();
      if (productsFile.length > 0) {
        const newArray = productsFile.filter((product) => product.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
