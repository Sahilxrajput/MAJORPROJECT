const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");


async function main() {
    await mongoose.connect("mongodb://localhost:27017/wanderlust");
};



main()
    .then(()=>{
        console.log("Connected to databases");
    })
    .catch((e)=>{
        console.log(e);
    });

const initDB = async () => {
 await   Listing.deleteMany({});
 initData.data = initData.data.map((obj) => ({ ...obj, owner: "67e290416cacd2597c70721e" }));
 await   Listing.insertMany(initData.data);
 console.log("Data was initialized");
};

initDB();


