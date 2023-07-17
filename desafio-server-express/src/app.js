import express from "express";
import ProductsManager from "./managers/productmanager.js";

///inicializamos y ejecutamos
const app = express();

//funciones middlewares fijas, que se ejecutan antes de que se envie la respuesta al cliente
//van siempre en el archivo de punto de entrada del servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* instancia, se pasa la ruta que espera el constructor*/
const productManager = new ProductsManager("./products.json");

//funcionalidades de lectura con el metodo get
app.get("/products", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json("I dont have that");
  }
});

//debe devolver todos los productos creados

//en el puerto se busca localhost:8080/products?value=value (porejemplo 200)

app.get("/productslimit", async (req, res) => {
  const { limit } = req.query;
  const product = await productManager.getProducts(limit);
  const productsLimit = product.slices(0, 5);

  if (product < limit) {
    res.status(200).json(productsLimit);
    console.log(productsLimit);
  } else {
    res.status(400).json({ msg: "Products not found" });
    console.log(req.query);
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(parseInt(pid));
    if (product) {
      res.json({ msg: "Product encountered", product });
    } else {
      res.status(200).json({ msg: "Product not found" });
      console.log(req.params);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/products", async (req, res) => {
  const product = req.body;
  const newProduct = await productManager.addProduct(product);
  res.json({ msg: "Product added", newProduct });
});

app.put("/products/:pid", async (req, res) => {
  try {
    const product = req.body;
    const { pid } = req.params;
    const idProduct = parseInt(pid);
    const productExist = await productManager.getProductById(idProduct);
    if (productExist) {
      await productManager.updateProduct(product, idProduct);
      res.json({ msg: `Product id: ${idProduct} updated` });
    } else {
      res.status(404).send({ msg: `Product id: ${idProduct} not found` });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const idProduct = parseInt(pid);
    const productExist = await productManager.getProductById(idProduct);
    if (productExist) {
      await productManager.deleteProduct(idProduct);
      res.status(200).json({ msg: `Product id: ${idProduct} deleted` });
    } else {
      res.status(404).send({ msg: `Product id : ${idProduct} not found` });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Se mandará a llamar desde el navegador a la url http://localhost:8080/products?limit=5 , eso debe devolver sólo los primeros 5 de los 10 productos.

///Se mandará a llamar desde el navegador a la url http://localhost:8080/products/2, eso debe devolver sólo el producto con id=2.

//Se mandará a llamar desde el navegador a la url http://localhost:8080/products/34123123, al no existir el id del producto, debe devolver un objeto con un error indicando que el producto no existe.

//se puede generar nuestro servidor que escuche en un puerto aleatorio libre

app.listen(8080, () => {
  console.log("Server express OK on Port 8080");
});
