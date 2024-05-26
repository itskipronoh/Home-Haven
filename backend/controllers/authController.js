const User = require('../models/user')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");


/* USER LOGIN*/
const loginUser = async (req, res) => {
  try {
    /* Take the infomation from the form */
    const { email, password } = req.body

    /* Check if user exists */
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(409).json({ message: "User doesn't exist!" });
    }

    /* Compare the password with the hashed password */
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials!"})
    }

    /* Generate JWT token */
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    delete user.password

    res.status(200).json({ token, user })

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}

      
/* REGISTER USER*/


const registerUser =  async (req, res) =>{
    const {firstName, lastName, email, password} = req.body;

         /* The uploaded file is available as req.file */
      const profileImage = req.file;

      // if (!profileImage) {
      //   return res.status(400).send("No file uploaded");
      // }
  
  /* path to the uploaded profile photo */
    const profileImagePath = profileImage?.path || null; 

    if(!firstName || !lastName || !email || !password){
       return  res.status(401).json({msg: 'provide all fields'})
      
    }

    /* Check if user exists */
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists!" });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

     /* Create a new User */
     const newUser = new User({
        firstName,
        lastName,
        email,
        password : hashedPassword ,
        profileImagePath,
      });
  
      /* Save the new User */
      await newUser.save();

      newUser.password = null;

      res.status(201).json({ message: "User registered successfully!", user: newUser });


}


module.exports = {registerUser, loginUser}