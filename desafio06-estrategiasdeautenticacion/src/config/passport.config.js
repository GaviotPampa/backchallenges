import passport from 'passport';
import {Strategy as LocalStrategy }from "passport-local";

import UserDao from "../daos/user.dao.js";
const userDao = new UserDao();

const strategyOptions = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

const register = async (req, email, done) => {
  try {
    
    const user = await userDao.getByEmail(email);
    if (user) {
      console.log("User already exists", user);
      return done(null, false);
     
    }
    console.log(done);
    const newUser = await userDao.register(req.body);
    return done(null, newUser);
  } catch (error) {
    return done("Error al obtener el usuario" + error);
  }
};

const login = async (req, email, password, done) => {
  try {
    const user = { email, password };
    console.log("USER", user);
    const userLogin = await userDao.login(user);
    console.log("LOGIN", userLogin);
    if (!userLogin) return done(null, false, { message: "User not found" });
    return done(null, userLogin);
  } catch (error) {
    console.log(error);
  }
};

const registerStrategy = new LocalStrategy(strategyOptions, register);
const loginStrategy = new LocalStrategy(strategyOptions, login);

passport.use("login", loginStrategy);
passport.use("register", registerStrategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userDao.getById(id);
  return done(null, user);
});
