if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
const mongoose = require("mongoose");
const initData = require("./data.js");

const Listing = require("../models/listening.js");
const dbUrl = process.env.ATLAS_Url;

main().then(()=>{
    console.log("connection to DB");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(dbUrl);
}

let categoryAll = [
	"Beachfront",
	"Caves",
	"Lake",
	"Farms",
	"Rooms",
	"Lakefront",
	"Tiny Homes",
	"Treehouse",
	"Trending",
	"Tropical",
	"Camping",
	"Earth Homes",
];

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) =>({...obj,  owner: "661041fa689680fc8f6c5202"}));
    category: [
        `${categoryAll[Math.floor(Math.random() * categoryAll.length)]}`,
        `${categoryAll[Math.floor(Math.random() * categoryAll.length)]}`,
    ],

    await Listing.insertMany(initData.data);         //initData is object..........
    console.log("data was initialized");
}

initDB();



