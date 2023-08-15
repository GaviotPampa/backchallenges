import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controllers.js";
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", () => {
  const { first_name } = req.body;
  res.render("products", { first_name: first_name });
});

export default router;
