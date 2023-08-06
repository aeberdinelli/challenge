import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { RestaurantModel } from "../src/models/restaurant.model";
import { CityModel } from "../src/models/city.model";

dotenv.config();

(async () => {
    if (!process.env.MONGODB_URL) {
        throw new Error('MONGODB_URL env var is not defined. Check your .env file and try again');
    }

    await mongoose.connect(process.env.MONGODB_URL);

    const restaurantsCount = await RestaurantModel.countDocuments().exec();
    const citiesCount = await CityModel.countDocuments().exec();

    if (restaurantsCount > 0 || citiesCount > 0) {
        console.log('In order to prevent duplicated entries, DB should be empty before running the script');
        process.exit(0);
    }

    const restaurants = require('../samples/restaurants.json');

    await RestaurantModel.insertMany(restaurants);

    console.log(`✔️  Imported ${restaurants.length} restaurants`);

    const cities = [...new Set(restaurants.map((item: any) => item.address.city))];
    const json = cities.filter(city => !!city).map(city => ({ name: city }));

    await CityModel.insertMany(json);

    console.log(`✔️  Imported ${json.length} cities`);

    process.exit(0);
})();