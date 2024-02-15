// // var express=require("express")
// // var bodyParser=require("body-parser")
// // var mongoose=require("mongoose")

// // const app=express()

// // app.use(bodyParser.json())
// // app.use(express.static('public'))
// // app.use(bodyParser.urlencoded({
// //     extended:true
// // }))

// // mongoose.connect('mongodb+srv://chavananushka782:mern123@cluster0.mpurmrx.mongodb.net/goFoodMern?retryWrites=true&w=majority')
// // var db=mongoose.connection
// // db.on('error',()=> console.log("Error in Connecting to Database"))
// // db.once('open',()=> console.log("Connected to Database"))

// // app.post("/sign_up",(req,res) => {
// //     var name= req.body.name
// //     var age=req.body.age
// //     var email=req.body.email
// //     var phno=req.body.phno
// //     var gender=req.body.gender
// //     var password=req.body.password

// //     var data={
// //         "name":name,
// //         "age":age,
// //         "email":email,
// //         "phno":phno,
// //         "gender":gender,
// //         "password":password
// //     }
// //     db.collection('users').insertOne(data,(err,collection) => {
// //         if(err){
// //             throw err;
// //         }
// //         console.log("Record Inserted Succesfully")
// //     })
// //     return res.redirect('signup_successful.html')
// // })

// // app.get("/",(req,res) => {
// //     res.set({
// //         "Allow-acces-Allow-Origin":'*'
// //     })
// //     return res.redirect('index.html')
// // }).listen(3000);

// // console.log("Listening on port 3000")




const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'html');

mongo/
const db = mongoose.connection;

db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    const user = new User({ name, email, password });

    user.save((err) => {
        if (err) {
            console.error('Error saving user:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('User registered successfully');
            res.send('Registration successful');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
