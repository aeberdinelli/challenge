import { HydratedDocument } from "mongoose";
import { City, CityModel } from '../models/city.model';

export async function getAllCities(): Promise<Array<HydratedDocument<City>>> {
    const results = await CityModel
        .find({})
        .sort({ name: 'asc' })
        .exec();

    return results;
}