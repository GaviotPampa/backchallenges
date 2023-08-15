import { Router } from "express";
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";
import {
  loginResponse,
  registerResponse,
} from "../controllers/user.controllers.js";
const router = Router();

router.post("/register", passport.authenticate("register"), registerResponse);

router.post("/login", passport.authenticate("login"), loginResponse);

router.get("/", (req, res) => {
  const { first_name } = req.body;
  res.render("products", { first_name: first_name });
});

router.get("/private", isAuth, (req, res) => res.send("route private"));
router.get(
  "/registergithub",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/profile-github",
  passport.authenticate("github", { scope: ["user:email"] })
);

export default router;
