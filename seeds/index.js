const mongoose = require('mongoose');
const cities= require('./cities');
const {places, descriptors}= require( './seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/rate-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const sample = function( array){
    return array[Math.floor(Math.random()* array.length)];
}
const seedDB = async function(){
    await Campground.deleteMany({});
    for(let i=0;i<50;i++)
    {
        const rand= Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random() * 100);
        const camp= new Campground({
            author: '60a266ecb307d76ceaceeee1',
            location: `${cities[rand].city}, ${cities[rand].state}`,
            title : `${sample(descriptors)} ${sample(places)}`,
            images: [{
            
                url:
                    'https://res.cloudinary.com/dm2xluceh/image/upload/v1621701548/RateCamp/fwnq699s1nzhaqibn1r0.jpg',
                filename: 'RateCamp/fwnq699s1nzhaqibn1r0'
            },
            {
            
                url:
                    'https://res.cloudinary.com/dm2xluceh/image/upload/v1621701549/RateCamp/drdqdjzruoyyoipysnah.jpg',
                filename: 'RateCamp/drdqdjzruoyyoipysnah'
            }],
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
            price: price
        })
        await camp.save();
    }
}

seedDB().then( function (){
    mongoose.connection.close();
})