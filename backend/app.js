const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const connectDB = require('./src/config/dbConfig')
const authRoutes = require('./src/routes/authRoutes')
const userRoutes = require('./src/routes/userRoutes')
const adminRoutes = require('./src/routes/adminRoutes')

const port = process.env.PORT
connectDB()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173", // Replace with your React app's URL
  methods: ["GET", "POST", "PATCH"], // Allowed methods
  credentials: true,
}))
app.use("/auth", authRoutes)
app.use("/user", userRoutes)
app.use("/admin",adminRoutes)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 