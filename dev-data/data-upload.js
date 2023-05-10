const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require(`${__dirname}/../model/tourModel.js`);

dotenv.config({ path: `${__dirname}/../config.env` });
const DB = process.env.DB;

mongoose
  .connect(DB)
  .then(() => console.log('connection successful'))
  .catch((err) => console.log(err.message));

const data = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours-simple.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Tour.create(data);
    console.log('successfully created');
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('deleted successfully');
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};
// deleteData();
// importData();
// console.log(process.argv[2]);
if (process.argv[2] == '--import') {
  importData();
} else if (process.argv[2] == '--delete') {
  deleteData();
}
