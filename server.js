require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
//mongodb connection

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log(err));

//express
const app = express();

//cors
app.use(cors());

//middleware
app.use(express.json());

//test route
app.get("/",(req,res)=>{
    res.send("server running")
});

//import routes
const productRoutes = require("./Routes/productRoutes");

//use Routes
app.use(productRoutes);

//serve uploads
app.use("/uploads",express.static("uploads"));


//test routes
app.get("/",(req,res)=>{
    res.send("server running");
});


//Dynamic PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(`server is running on ${PORT}`);
});
