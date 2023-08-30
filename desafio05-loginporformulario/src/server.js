import 'dotenv/config';
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import userRouter from "./routes/user.router.js";
import sessionRouter from "./routes/sessions.router.js";
import viewsRouter from "./routes/views.router.js";
import productsRouter from './routes/products.router.js';
import "./db/db.Connection.js";
import { connectionString } from "./db/db.Connection.js";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";

const mongoStoreOptions = {
  store: MongoStore.create({
    mongoUrl: connectionString,
    crypto: {
      secret: "1234",
    },
  }),
  secret: "1234",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000,
  },
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

///Inicializar el motor con app.engine
///con app.set indicamos en que parte del proyecto estaran las vistas
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(cookieParser());
app.use(session(mongoStoreOptions));

app.use(express.static(__dirname + "/public"));

app
  .use("/users", userRouter)
  .use("/session", sessionRouter)
  .use('/', productsRouter)
  .use("/", viewsRouter);

app.listen(8080, () => {
  console.log("👻Server listening on port 8080");
});
