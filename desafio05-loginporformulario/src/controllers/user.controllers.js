import UserDao from "../daos/user.dao.js";
const userDao = new UserDao();

export const registerUser = async (req, res) => {
  try {
    const newUser = await userDao.registerUser(req.body);
    if (newUser) res.redirect("/login");
    else res.redirect("/session/error-register");
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userDao.loginUser(req.body);
    if (user) {
      req.session.email = email;
      req.session.password = password;
      res.redirect("/products");
    } else 
  /*   res.json ({msg: 'Invalid'}) */
    res.redirect("/session/errorLogin");
  } catch (error) {
    console.log(error);
  }
};
