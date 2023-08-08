import { dirname } from 'path';
import { fileURLToPath } from "url";
export const __dirname = dirname(fileURLToPath(import.meta.url));

import {hashSync, compareSync, genSaltSync} from "bcrypt";

/**
 * Método para recibir password y retornar la password hasheada
 * @param {*} password string
 * @returns password hasheada -> string
 * @example
 * createHash ('1234)
 */

///createHAsh utiliza la password en el registro y isValidPassword en el login
export const createHash = password => hashSync(password, genSaltSync (password));

/**
 * Metodo que compara la password hasheada con la de login
 */
export const isValidPassword = (user, password ) => compareSync (user.password, password);