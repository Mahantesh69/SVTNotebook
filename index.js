const connectToMango = require('./db');
const express = require('express')

connectToMango();


const app = express()
const port = 5000
var cors = require('cors')

app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebbok backend listening on http://localhost:${port}`)
})



// const express = require('express')
// const router = express.Router()
// const User = require('../models/User')
// const {body, validationResult } = require('express-validator')

// router.post("/",[
//     body('name').isLength({min:5}),
//     body('email').isEmail().isLength({min:10}),
//     body('password').isLength({min:8})
// ],async (res,req)=>{
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({errors:errors.array()})
//     }
//     let user = await User.findOne({email:req.body.email})
//     if(user){
//         return res.status(400).json("sorry user with this email already exist")

//     }
//     user = await User.create({
//         name:req.body.name,
//         email:req.body.email,
//         password:req.body.password
//     })
//     res.json({nice:"nice"})

// })

// module.exports = router