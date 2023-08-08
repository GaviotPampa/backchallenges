const fs = require(`fs`);

class ProductsManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const product = await fs.promises.readFile(this.path, "utf-8");
        const productsjs = JSON.parse(product);
        return productsjs;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }
  /* 
  createProduct(title, description, price, thumbnail,code,stock) {
    const product = {
      id: this.#getMaxId() + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(product);
  } */

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

      if (!products.id.includes(id)) {
        products.id.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
        return product;
      } else {
        console.log("El id seleccionado ya existe");
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
        productsFile[index] = { ...product };
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

/* instancia, se pasa la ruta que espera el constructor*/
const manager = new ProductsManager("./products.json");

const product1 = {
  title: "Bota 1",
  description: "description Bota 1",
  price: 25000,
  thumbnail: "thumbnail",
  code: "abc123",
  stock: 10,
};

const product2 = {
  title: "Bota Dos",
  description: "description Bota 2",
  price: 45000,
  thumbnail: "thumbnail",
  code: "abc124",
  stock: 15,
};

const product3 = {
  title: "Bota tres",
  description: "description Bota 3",
  price: 65000,
  thumbnail: "thumbnail",
  code: "abc125",
  stock: 20,
};

/* consulta de productos */
const test = async () => {
  //arroja un arreglo vacio, ya que aun no esta creado el archivo JSON
  await manager.addProduct(product1); //CREACION DEL PRODUCTO
  //segunda consulta escribe el primer producto
  /*   const getProducts1 = await manager.getProducts();
  console.log("Consulta 2: ", getProducts1); */
  //tercer consulta
  await manager.addProduct(product2);
  /*   const getProducts2 = await manager.getProducts();
  console.log("Consulta 3: ", getProducts2); */
  //cuarta consulta
  await manager.addProduct(product3);
  /*   const getProducts4 = await manager.getProducts();
  console.log("Consulta 4: ", getProducts4); */
  //quinta consulta
  /*    await manager.uppdateProduct(
    "Bota cuatro",
    "description Bota 4",
    65000,
    "thumbnail",
    "abc125",
    20,
    5
  );
  const getProducts5 = await manager.getProducts();
  console.log("Consulta 4: ", getProducts5);  */
  /* 
  await manager.getProductById(1);
  const getProducts6 = await manager.getProducts();
  console.log("Consulta ID: ", getProducts6); */
  const getProducts = await manager.getProducts();
  console.log("Consulta Inicial:", getProducts);
};

test(); //ejecutar


