// Import from packages
const express = require("express")
const mongoose = require("mongoose")
// Import from other files
const authRouter = require("./routes/auth")
const userRouter = require("./routes/user")

require('dotenv').config()
// console.log(process.env.PRODUCT_KEY)
// console.log(process.env.Another)

// Init
const PORT = process.env.PORT
const db = process.env.DB
const app = express()

// middleware
app.use(express.json())
app.use(authRouter)
app.use(userRouter)


// connections
mongoose.connect(db).then(() => {
	console.log("connected to mongo successfully!")
}).catch((e) => console.log(e))

app.listen(PORT, "0.0.0.0", () => {
	console.log(`connected to port ${PORT}`)
})
