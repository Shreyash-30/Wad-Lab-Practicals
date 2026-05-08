const express=require('express');
const mongoose=require('mongoose');
const User=require('./model');

const app=express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/test');

app.get('/users',async(req,res)=>{
    let users=await User.find();
    res.json(users);
});

app.post('/users',async(req,res)=>{
    let user = new User(req.body);
    await user.save();
    res.send("User Added");
});

app.put('/users/:id',async(req,res)=>{
    await User.findByIdAndUpdate(req.params.id,req.body);
    res.send("User updated");
});

app.delete('/users/:id',async(req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    res.send("User Deleted");
});

app.listen(3000, ()=>{
    console.log("Server is listening on port 3000");
})