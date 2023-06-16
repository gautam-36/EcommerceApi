const router = require("express").Router()
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

// REGISTER USER 

router.post("/register", async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
    })
    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json(err)
    }
})


// LOGIN

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).status.json("user not found !")
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY)
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
        OriginalPassword != req.body.password && res.status(404).json("wrong password!")
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SEC, {
            expiresIn: "3d"
        }
        )
        // for not showing the password in response 
        const { password, ...others } = user._doc;

        res.status(201).json({ ...others, accessToken })

    } catch (error) {

    }
})

module.exports = router



