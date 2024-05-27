const mongoose = require("mongoose");
const initData = require("./data.js");

const Listing = require("../models/listening.js");

let mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connection to DB");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(mongo_url);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) =>({...obj,  owner: "661041fa689680fc8f6c5202"}));
    await Listing.insertMany(initData.data);         //initData is object..........
    console.log("data was initialized");
}

initDB();






/*
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");
        names.add("Charlie");

        // Using lambda expression
        names.forEach(name -> System.out.println(name));

        // Using method reference
        names.forEach(System.out::println);
    }
}
*/