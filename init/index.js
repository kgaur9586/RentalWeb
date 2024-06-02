if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
    }


const mongoose = require("mongoose");
const initData = require("./data.js");

const Listing = require("../models/listening.js");

// let mongo_url = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;

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
	"Cabins",
	"Omg",
	"Lake",
	"Design",
	"Amazing Pools",
	"Farms",
	"Amazing Views",
	"Rooms",
	"Lakefront",
	"Tiny Homes",
	"Countryside",
	"Treehouse",
	"Trending",
	"Tropical",
	"National Parks",
	"Casties",
	"Camping",
	"Top Of The World",
	"Luxe",
	"Iconic Cities",
	"Earth Homes",
];

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) =>({...obj,  owner: "661041fa689680fc8f6c5202"}));
    category: [
        `${categoryAll[Math.floor(Math.random() * 22)]}`,
        `${categoryAll[Math.floor(Math.random() * 22)]}`,
    ],

    await Listing.insertMany(initData.data);         //initData is object..........
    console.log("data was initialized");
}

initDB();



