let express = require("express");
let app = express(); //it contains all the methods of express
let port = process.env.PORT || 3000; //this used when we have to host our website automatically it will take the port of the user
let mongo = require("./db/conn");
let path = require("path");
let hbs = require("hbs");
let partailsPath = path.join(__dirname, "../views/partials");
let Register = require("./models/register");
let bcrypt = require("bcryptjs");
mongo();

// let securePassword = async (password) => {
//   let hashedPassword = await bcrypt.hash(password, 10);
//   console.log(hashedPassword);

//   let checked = await bcrypt.compare("rishabh@122", hashedPassword);
//   console.log(checked);
// };
// securePassword("rishabh@123");

app.use(express.urlencoded({ extended: true }));

hbs.registerPartials(partailsPath);

app.set("view engine", "hbs");
app.use(express.json());
app.get("/", (req, res) => {
  res.render("./index");
});

app.get("/register", (req, res) => {
  res.render("./register");
});
app.listen(port, () => {
  console.log(`connection sucessful at port number ${port}`);
});

app.post("/register", async (req, res) => {
  try {
    // res.send(req.body.name);

    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;

    if (password === confirmPassword) {
      let newRegister = Register.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
      });

      //password ko hash karna padega

      let registered = (await newRegister).save();
      res.status(201).render("./index");
    } else {
      res.send("password not matching");
    }
    console.log("SENT SUCESSFULLY");
  } catch (err) {
    console.log(err);
  }
});
////// Login Form///////
app.get("/login", (req, res) => {
  res.render("./login");
});

app.post("/login", async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let userEmail = await Register.findOne({ email: email });
    let isMatch = await bcrypt.compare(password, userEmail.password);

    if (isMatch) {
      res.redirect("/");
    } else {
      res.send("Invalid");
    }
  } catch {
    res.send(400).send("Email Not Registered");
  }
});
