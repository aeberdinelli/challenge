import mongoose, { Schema } from 'mongoose';

export interface Restaurant {
    name: string;
    phoneNumber: string;
    cuisine: string;
    priceRange: string;
    dressCode: string;
    chef: string;
    rating: number;
    reviewCount: number;
    address: {
        address1: string;
        address2?: string;
        city?: string;
        state: string;
        postalCode: string;
        coordinates: {
            lat: number;
            lng: number;
        }
    }
}

export type RestaurantFilters = Omit<Restaurant, 'reviewCount'|'phoneNumber'|'address'> & { city: string };

const RestaurantSchema = new Schema<Restaurant>({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    cuisine: { type: String, required: true },
    priceRange: { type: String, required: true },
    dressCode: { type: String, required: true },
    chef: { type: String, required: true },
    rating: { type: Number, required: true },
    reviewCount: { type: Number, required: true },
    address: {
        address1: { type: String, required: true },
        address2: { type: String, required: false },
        city: { type: String, required: false },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        coordinates: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true }
        }
    }
});

export const RestaurantModel = mongoose.model<Restaurant>('Restaurant', RestaurantSchema);