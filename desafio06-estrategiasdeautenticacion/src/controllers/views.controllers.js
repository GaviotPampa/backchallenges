export const register = (req, res) => {
  res.render("register");
};

export const profile = (req, res) => {
  res.render("profile");
};

export const login = (req, res) => {
  res.render("login");
};

export const errorRegister = (req, res) => {
  res.render("errorRegister");
};


export const errorLogin = (req, res) => {
  res.render("errorLogin");
};



export const products = (req, res) => {
  res.render("products");
};
