import express from "express";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import indexRouter from "./routes/index.router.js";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/realtimeproducts.router.js";
import {createProduct,getProducts} from "./managers/productmanager.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);

app.use(morgan(`dev`));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/index", indexRouter);
app.use(`/api/products`, productRouter);
app.use(`/api/carts`, cartRouter);
app.use("/realtimeproducts", viewsRouter);

app.use(express.static(__dirname + "/public"));

const httpServer = app.listen(8080, () => {
  console.log("🎈Server express listening on port 8080");
});

const socketServer = new Server(httpServer);

const products = [];

socketServer.on("connection", async (socket) => {
  console.log("¡New connection!Client connected", socket.id);

  socket.on("disconnect", () => {
    console.log("¡User disconnect!", socket.id);
  });

  socketServer.emit('arrayProducts', products);

  socket.on("new-product", async (data) => {
    await createProduct (data);
    socketServer.emit("arrayProducts", getProducts());
   /*  products.push(data); */
  /*   socketServer.emit("arrayProducts", products); */
  });

  socket.on("delete-product", async (data) => {
    await deleteProduct (data);
    socketServer.emit("arrayProducts", getProducts());
  
  });
});

/* app.listen(8080, () => {
console.log(`Server express listening on port 8080`);
}); */
