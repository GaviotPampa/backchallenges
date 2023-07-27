//de esta forma traemos todo express ademas de router
import { Router } from "express";
const router = Router();

///manager y la instancia de la clase la uso si uso Class

/* import ProductManager from "./../managers/productmanagers.js"; */

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../managers/productmanager.js";

//instancia a la clase que le da funcionalidad a las rutas
/*  const productManager = new ProductManager("./products.json");  */

router.get("/", async (req, res, next) => {
  try {
    const products = await getProducts();
    const { limit } = req.query;
    const arrayFilter = products.filter(
      (product) => (product.price = parseInt(limit, 2))
    );
    res.status(200).json(arrayFilter);
  } catch (error) {
    next(error);
  }
});

router.get("/:pid", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getProductById(Number(id));
    const productId = product.find(
      (product) => product.id === Number(productId)
    );
    if (productId === id) {
      res.json(product);
    } else {
      res.status(400).json({ message: "Product not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const product = req.body;
    const newProduct = await createProduct(product);
    res.json(newProduct);
  } catch (error) {
    next(error);
  } 
});

router.put("/:pid", async (req, res, next) => {
  try {
    const product = req.body;
    const { id } = req.params;

    const pid = parseInt(id);
    const productExist = await updateProduct(parseInt(pid));

    if (("existe el producto:", productExist)) {
      await updateProduct(product, parseInt(pid));
      res.status(200).send({ message: `Product id: ${id} updated` });
    } else {
      res.status(400).json({ message: `Product id: ${id}  not found` });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const productExist = await getProductById(pid);
    if (productExist) {
      await deleteProduct(parseInt(pid));
      res
        .status(200)
        .send({ message: `Product id: ${pid} deleted successfully` });
    } else {
      res.status(400).json({
        message: `The product  with id: ${pid} was not found to delete`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router; ///exportamos al archivo del servidor e importamos en el archivo del servidor
