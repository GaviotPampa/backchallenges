import express from 'express';
import { __dirname, mongoStoreOptions } from './utils.js'
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import userRouter from './routes/user.router.js';
import sessionRouter from './routes/session.router.js';
/* import productsRouter from './routes/products.router.js'; */
import './config/db.Connection.js';

/* import { __dirname } from './utils.js'; */
import passport from 'passport';
import './config/passport.config.js';
import './config/github.config.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars',handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine', 'handlebars')

app.use(cookieParser());
app.use(session(mongoStoreOptions));

//inicializar passport antes de las rutas
app.use (passport.initialize());
app.use(passport.session());

app.use('/users', userRouter);
app.use('/session', sessionRouter);
/* app.use('/api/products', productsRouter); */

app.listen(8080, ()=>{
console.log('👻Server listening on port 8080');
});