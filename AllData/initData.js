const mongoose = require('mongoose');
const initdata = require('./data.js');
const Listing = require('../models/listing.js');

const MONGO_URL = 'mongodb://127.0.0.1:27017/roomora';

main()
    .then(() => {
        console.log('mongoose is connected');
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
};

const insertData = async () => {
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({ ...obj, owner: "692736ba7ec9c14765d76380" }));
    await Listing.insertMany(initdata.data);
    console.log('data is inserted');
};

insertData();