// npm i passport-github2
import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import UserDao from "../daos/user.dao.js";
const userDao = new UserDao();

const strategyOptions = {
  clientID: "Iv1.a9203a880073a19b",
  clientSecret: "3763c2e4e8b9c1fff8a84512231dc821b135d4e6",
  callbackURL: "http://localhost:8080/users/github",
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  try {
    /*  console.log('PROFILE --> ', profile); */
    const email =
      profile._json.email !== null ? profile._json.email : profile_json.blog;
    const user = await userDao.getByEmail(email);
    if (user) return done(null, user);
    const newUser = await userDao.register({
      first_name: profile._json.name.split(" ")[0],
      last_name: profile._json.name.split(" ")[1],
      email,
      password: "",
      isGithub: true,
    });
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));
