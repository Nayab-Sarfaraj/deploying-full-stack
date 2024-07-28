const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.ATLAS_username}:${process.env.password}@cluster0.peuugea.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("ss");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectToDB;
