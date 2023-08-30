import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controllers.js";
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
/* 
router.post('/', (req, res) => {
  const { first_name, email } = req.body;
  res.cookie(first_name, email, { maxAge: 10000 }).send('cookie agregada')
}); */
router.get("/", (req,res) => {
  const { first_name } = req.body;
  res.render("products", { first_name: first_name });
});

export default router;
