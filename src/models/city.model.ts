import mongoose, { Schema } from 'mongoose';

export interface City {
    name: string;
}

const CitySchema = new Schema<City>({
    name: { type: String, required: true }
});

export const CityModel = mongoose.model<City>('City', CitySchema);