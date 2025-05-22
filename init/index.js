require('dotenv').config();

const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");


async function main() {
  try {
    const connectionDb = await mongoose.connect(process.env.ATLAS_DB_URL); // use mongourl not env one cuz its not in root
    console.log(`Mongo Connected DB Host ${connectionDb.connection.host}`);
  } catch (e) {
    console.error("Database connection error:", e);
  }
}

main();



const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "682f70922ea7c941f438c975",
  }));
  await Listing.insertMany(initData.data);
  console.log("Data was initialized");
};

initDB();
