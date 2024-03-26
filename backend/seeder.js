
import mongoose  from "mongoose";
import colors from 'colors';
import dotenv from "dotenv";
import User from "models/model.js";
import Attendance from "models/model.js";
import Subject from "models/model.js";
import connectDB from './config/db.js';
import users from './data/users'
dotenv.config();

connectDB();


// import data exist in data/users.js and data/products.js in //=>database
const importData = async () => {
  try {
    // delete all data from the database
    await Subject.deleteMany();
    await Attendance.deleteMany();
    await User.deleteMany();

    // insert new user data into User collection and store the created users
    const createdUsers = await User.insertMany(users);
    // modify first user to admin is admin@email.com
    const adminUser = createdUsers[0]._id;


    // show that import function  works correctly
    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// delete all data in database
const destroyData = async () => {
  try {
    // delete all data from the database
    await Subject.deleteMany();
    await Attendance.deleteMany();
    await User.deleteMany();
    // show that delete function  works correctly
    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};
//for call it using cmd => look at package.json
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
