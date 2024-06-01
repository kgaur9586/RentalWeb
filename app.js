if(process.env.NODE_ENV != "production"){
require('dotenv').config();
}
// console.log(process.env.SCRETE);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const path = require("path");
const wrapAsync= require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
// const { listingSchema , reviewSchema} = require("./schema.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");



let mongo_url = "mongodb://127.0.0.1:27017/wanderlust";
// const dbUrl = process.env.ATLASDB_URL;

main().then(()=>{
    console.log("connection to DB");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(mongo_url);
}


app.engine('ejs', ejsMate );

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


//middle ware.................................................
app.use(express.static(path.join(__dirname,"/public")));

app.use(express.urlencoded({extended:true}));

app.use(methodOverride("_method"));


const  store = MongoStore.create({
    mongoUrl:mongo_url,
    crypto: {
        secret: process.env.SECRET
      },
      touchAfter: 24*3600,
 });

store.on("error", ()=>{
       console.log("ERROR IN MONGO SESSION STORE", err);
 })

const sessionOptions= {
    store,
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        express: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge:7 * 24 * 60 * 60 * 1000,
        httpOnly : true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
res.locals.successMsg = req.flash("success");
res.locals.errorMsg = req.flash("error");
res.locals.currUser = req.user;
next();
})


// app.get("/demouser", async(req,res)=>{
// let fakeUser = new User({
// email : "harshrajput304112gamil.com",
// username: "harshrajput-369"
//     })
// let registerUser = await User.register(fakeUser, "HELLOWORLD");
// res.send(registerUser);
// })


app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter)


// app.get("/testListening", async(req,res)=>{
//     let sampleListening = new listening({
//         title:"My new villa",
//         description:"By the beach",
//         price:1200,
//         location:"cangaunt goa",
//         country:"India"
//     });

//     await sampleListening.save();
//     console.log("sample was saved");
//     res.send("successful testing")
// })


app.all("*", (req,res,next)=>{
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res ,next)=>{
    let{statusCode = 500, message = "Something went wrong"} = err;
    res.status(statusCode).render("error.ejs", {message});
});

app.listen("8080", (req,res)=>{
    console.log("port listen")
})