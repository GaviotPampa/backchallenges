import express from "express";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import {Server} from "socket.io";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/realtimeproducts.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);

app.use(morgan(`dev`));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(`/api/products`, productRouter);
app.use(`/api/carts`, cartRouter);
app.use("/realtimeproducts", viewsRouter);

app.use(express.static(__dirname + "/public"));

const httpServer = app.listen(8080, () => {
    console.log("🎈Server express listening on port 8080");
  });
  
  const socketServer = new Server (httpServer);

socketServer.on('connection', async(socket)=>{
    console.log('¡New connection!', socket.id);

    socketServer.emit('messages', await msgManager.getAll());

    socket.on('disconnect', ()=>{
        console.log('¡User disconnect!', socket.id);
    })

    socket.on('newUser', (user)=>{
        console.log(`>${user} inició sesión`);
    })

    socket.on('chat:message', async(msg) =>{
        await msgManager.createMsg(msg);
        socketServer.emit('messages', await msgManager.getAll());
    })

    socket.emit('msg', 'bienvenido al chat');

    socket.on('newUser', (user)=>{
        socket.broadcast.emit('newUser', user); //llega a todos, menos al que inició sesión
    })

    socket.on('chat:typing', (user)=>{
        socket.broadcast.emit('chat:typing', user)
    })
})

/* app.listen(8080, () => {
console.log(`Server express listening on port 8080`);
}); */

