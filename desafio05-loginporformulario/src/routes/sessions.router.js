import { Router } from "express";
const router = Router();
import { login, register, errorLogin, errorRegister, profile, products } from "../controllers/views.controllers.js";

router.get('/login', login);
router.get('/register', register);
router.get('/errorLogin', errorLogin);
router.get('/error-register', errorRegister);
router.get('/profile', profile);
router.get('/products', products);

export default router;