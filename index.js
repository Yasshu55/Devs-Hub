const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const devuser = require("./devusermodel");
const userdev = require("./devusermodel");
const middleware = require("./middleware");
const reviewmodel = require("./reviewmodel");
const cors = require("cors");


const app = express();
app.use(express.json())
app.use(cors({origin: '*'}));


mongoose.connect("mongodb+srv://yashwanthsai:yashwanthsai123@cluster0.3osfkny.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log('DB Connected!'))
.catch((err) =>{ console.log(err);})


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/register",async (req,res) =>{
        try {
            const {fullname,email,mobile,skills,password,confirmpassword} = req.body;
            const exist = await userdev.findOne({email});

            if(exist){
                return res.status(400).send('User already exist')
            }
        
            if(password !== confirmpassword){
                return res.status(400).send('Password not matching')
            }

            const user = new userdev({
                fullname,
                email,
                mobile,
                skills,
                password,
                confirmpassword
            });

             user.save();
        } catch (err) {
            console.log(err);
           return res.status(500).send("Internal Server Error");
        }
});

app.post("/login",async (req,res) =>{

    try {

        const {email,password} = req.body;
        const exist = await devuser.findOne({email});

        if(!exist){
            return res.status(400).send('User not exist')
        }

        if(password !== exist.password){
            return res.status(400).send('Password not matching')
        }

        let payload = {
            user:{
                id: exist.id
            }
        }

    jwt.sign(payload,"randomString",{expiresIn: 360000000}, 
    (err,token) =>{
        if(err) throw err;
        return res.status(200).json({token});
    });

        
    } catch (err) {
        console.log(err);
       return res.status(500).send("Internal Server Error");
    }

});


app.get('/allprofiles',middleware, async (req,res) =>{
try{
    const allprofiles = await userdev.find();
    res.status(200).send(allprofiles);
} catch (err) {
    console.log(err);
   return res.status(500).send("Internal Server Error");
}
});

app.get("/myprofile", middleware,async (req,res) =>{
try {
    let user = await devuser.findById(req.user.id);
    return res.json(user);
} catch (err){
    console.log(err);
   return res.status(500).send("Server Error");
}
});


app.post("/addreview",middleware,async (req,res) =>{
    try {
        const {taskworker,rating} = req.body;
        const exist = await devuser.findById(req.user.id);
        const newReview = new reviewmodel({
            taskprovider: exist.fullname,
            taskworker,
            rating
        });
        newReview.save();
        return res.status(200).send("Review added successfully");
    } catch (err) {
        console.log(err);
        return res.status(500).send("Server Error");
    }
})

app.get("/myreview",middleware,async (req,res) =>{
    try {
        let allreviews = await reviewmodel.find();
        let myreviews = allreviews.filter(review => review.taskworker.toString === req.user.id.toString);
        return res.status(200).send(myreviews);        
    } catch (err) {
        console.log(err);
        return res.status(500).send("Server Error");
    }
})


app.listen(5000,()=>{
    console.log("Server is running on port 5000")
})