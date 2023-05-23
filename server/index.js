const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

//Products Schema
const ProductModel = new mongoose.model("Products",new mongoose.Schema({
    name: String,
    price: Number
}))

const DB_CONNECTION = process.env.DB_CONNECTION
const DB_PASSWORD = process.env.DB_PASSWORD
mongoose.connect("mongodb+srv://elnur_admin:Admin123@spotify.wmxixvo.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log('MongoDB connected successfully!');
})
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`App running on PORT: ${PORT}`);
})

app.get('/api/products',async(req,res)=>{
    const products = await ProductModel.find();
    res.status(200).send(products);
})
app.get('/api/products/:id',async(req,res)=>{
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    res.status(200).send(product);
})
app.post('/api/products',async(req,res)=>{
    const newProduct = new ProductModel({
        name: req.body.name,
        price: req.body.price
    })
    await newProduct.save();
    res.status(201).send("product posted successfully!")
})
app.delete('/api/products/:id',async(req,res)=>{
    const id = req.params.id;
    await ProductModel.findByIdAndDelete(id);
    res.status(203).send('product deleted successfully!');
})
app.put('/api/products/:id',async(req,res)=>{
    const id = req.params.id;
    const updated = await ProductModel.findByIdAndUpdate(id,{
        name: req.body.name,
        price: req.body.price
    })
    res.status(200).send(`${updated.name} updated successfully!`);
})