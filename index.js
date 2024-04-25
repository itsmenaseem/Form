const express=require("express");
const mongoose=require("mongoose");
const path=require("node:path");
require("dotenv").config();
const app=express();
//Middleware
// app.use(express.json());
const mongoURI=process.env.MONGO_URI;
console.log(mongoURI);
mongoose.connect(mongoURI.toString())
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});
app.use(express.urlencoded({extended:true}))
const userSchema= new mongoose.Schema({
    name:String ,
    email: String ,
    password:String,
});
const User=mongoose.model("User",userSchema);
app.use(express.static(path.join(__dirname,'public')))
// app.get("/user",(req,res)=>{
//     User.find({})
//     .then(user=>{
//         res.json(user);
//         console.log(user);
//     })
//     .catch(err=>console.log(err));
// });
app.post("/add",(req,res)=>{
    const {name,email,password}=req.body;
    const user=new User({
        name:name,
        email:email,
        password:password
    });
    user.save()
    .then(newUser => res.status(201).json(newUser))
    .catch(err=>console.log(err));
});
// app.put("/change/:id",(req,res)=>{
//     const userId=req.params.id;
//     const{name,email,password}=req.body;
//     const updateData={
//         name:name,
//         password:password,
//         email:email
//     };
//     User.findByIdAndUpdate(userId,updateData,{new:true})
//     .then((updatedUser=>{
//         if(!updatedUser){
//             res.json("not found");
//         }
//         else{
//             res.json(updatedUser);
//         }
//     }))
//     .catch(err=>console.log(err));
// });
// app.delete("/delete/:id",(req,res)=>{
//     const userId=req.params.id;
//     const{name,email,password}=req.body;
//     User.findByIdAndDelete(userId)
//     .then((updatedUser=>{
//         if(!updatedUser){
//             res.json("not found");
//         }
//         else{
//             res.json("delete");
//         }
//     }))
//     .catch(err=>console.log(err));
// });
app.listen(4000);