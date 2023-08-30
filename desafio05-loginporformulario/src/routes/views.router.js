//el router de vistas siempre debe responder con res.render

//este router se colocará en la ruta raíz ‘/’ y no será necesario ser precedido por ‘/api’ como los demás

import { Router } from "express";
const router = Router();

router.get ('/', (req, res) => {
    res.render ('products', {products})
} );

export default router;

