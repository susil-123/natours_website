const mongoose = require('mongoose');
const express = require('express');
const app = require('./script');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const DB = process.env.DB;

mongoose
  .connect(DB)
  .then(() => console.log('connection successful'))
  .catch((err) => console.log(err.message));

app.listen(3000, '192.168.24.58', () => {
  console.log('started server');
});
