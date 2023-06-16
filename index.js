const express = require("express")
const app = express();
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const dotenv = require("dotenv")
const cors = require("cors");
dotenv.config()

// mongoose.connect("mongodb://localhost:27017/shop").then(() => {
//     console.log("dataBase is Connected")
// }).catch((err) => { console.log(err) })

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
}).then(() => {
    console.log("dataBase is Connected")
}).catch((err) => { console.log(err) })

app.use(cors());
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/carts", cartRoute)
app.use("/api/orders", orderRoute)


const port = process.env.PORT || 3001;

app.listen(port, (req, res) => {
    console.log("server is running at port 3001")
})


