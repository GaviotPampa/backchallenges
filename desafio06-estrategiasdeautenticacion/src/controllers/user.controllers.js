import UserDao from "../daos/user.dao.js";
const userDao = new UserDao();

export const registerResponse = (req, res, next)=>{
  try {
    res.json({
      msg: 'Register ok',
      session: req.session 
    });
  } catch (error) {
    next(error.message)
  }
}  

export const loginResponse = async(req, res, next)=>{
  try {
    const user = await userDao.getById(req.session.user);
    res.json({
      msg: 'Login ok',
      user
    
    })
    console.log(user);
  } catch (error) {
    next(error.message)
  }
}  

export const githubResponse = async (req, res, next) => {
  try {
    // console.log(req.user)
    const { first_name, last_name, email, isGithub } = req.user;
    res.json({
      msg: "Register/Login Github OK",
      session: req.session,
      userData: {
        first_name,
        last_name,
        email,
        isGithub,
      },
    });
  } catch (error) {
    next(error.message);
  }
};

/* 
export const registerUser = async (req, res) => {
  try {
    const newUser = await userDao.registerUser(req.body);
    if (newUser) res.redirect("/session/login");
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
      res.redirect("/session/profile");
    } else res.redirect("/session/register");
  } catch (error) {
    console.log(error);
  }
};
 */