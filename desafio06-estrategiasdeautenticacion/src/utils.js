import { dirname } from 'path';
import { fileURLToPath } from "url";
export const __dirname = dirname(fileURLToPath(import.meta.url));
import MongoStore from 'connect-mongo';
import { connectionString } from './config/db.Connection.js';

import {hashSync, compareSync, genSaltSync} from "bcrypt";

/**
 * Método para recibir password y retornar la password hasheada
 * @param {*} password string
 * @returns password hasheada -> string
 * @example
 * createHash ('1234)
 */

///createHAsh utiliza la password en el registro y isValidPassword en el login
export const createHash = password => hashSync(password, genSaltSync (10));

/**
 * Metodo que compara la password hasheada con la de login
 */
export const isValidPassword = ( password, user ) => compareSync (password, user.password);

export const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: connectionString,
        crypto: {
            secret: '1234'
        }
    }),
    secret: '1234',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
};