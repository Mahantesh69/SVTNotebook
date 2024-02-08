const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser")

const JWT_SECRET = "mahanteshisgoodboy";

//ROute:1 Create a user using : Post "/api/auth/createuser" . No login required
router.post("/createuser",
  [
    body("name", "Enter valid name").isLength({ min: 3, max: 20 }),
    body("email", "Enter valid email").isEmail().isLength({ min: 10, max: 50 }),
    body("password", "Password must be atleast 5 characters").isLength({min: 5,max: 30}),
  ],
  async (req, res) => {
    let sucess = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }
    // Check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({sucess, error: "Sorry a user with this email already exists"});
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // .then(user => res.json(user))
      // .catch(err => {console.log(err)
      // res.json({error:'Please enter a unique value for email' ,message:err.message})})
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      sucess = true;
      res.json({sucess, authToken });
      // res.json({ user });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(sucess,"some error occured");
    }
  }
);
//ROute:2 Create a user using : Post "/api/auth/login" No login required

router.post("/login",
  [
    body("email", "Enter valid email").isEmail(),
    body("password", 'Password cannot be blank').exists(),
   
  ],
  async (req, res) => {
    let sucess = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({sucess, errors: errors.array() });
    }
    const {email,password} = req.body;
    try{
      let user = await User.findOne({email})
      if(!user){
        return res.status(400).json({sucess, error:"Please try to login with correct credentials!"})
      }
      const passwordCompare = await bcrypt.compare(password, user.password );
      if(!passwordCompare){
        sucess = false;
        return res.status(400).json({sucess, error:"Please try to login with correct credentials!"})
      }
      const data = {
        user:{
          id:user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      sucess = true;
      res.json({sucess, authToken})

    }catch(error){
      console.error(error.message);
      res.status(500).send("some Error occured")
    }
  }
);
//ROute:3 Get loggedIn user details using : Post "/api/auth/getuser" .login required
router.post('/getuser',fetchuser,async (req, res) => {
try{
  userId = req.user.id
  const user = await User.findById(userId).select("-password")
  res.send(user)
}catch(error){
  console.error(error.message);
  res.status(500).send("Internal Server Error")
}
})
module.exports = router;
