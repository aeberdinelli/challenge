import { HydratedDocument } from "mongoose";
import { Restaurant, RestaurantFilters, RestaurantModel } from "../models/restaurant.model";
import { ListResponse } from "../types/common";

export async function createRestaurant(body: Restaurant): Promise<HydratedDocument<Restaurant>> {
    const restaurant: HydratedDocument<Restaurant> = new RestaurantModel(body);
    await restaurant.save();
    return restaurant;
}

export async function searchRestaurants(
    filters: Partial<RestaurantFilters>, 
    order: keyof Restaurant = 'name',
    sort: 'asc'|'desc' = 'asc',
    offset: number = 0, 
    limit: number = 20
): Promise<ListResponse<HydratedDocument<Restaurant>>> {
    const parsedFilters: Record<string, unknown> = {};

    if (filters.name) {
        parsedFilters.name = new RegExp(filters.name, 'i');
    }
    if (filters.city) {
        parsedFilters['address.city'] = filters.city;
    }
    if (filters.cuisine) {
        parsedFilters.cuisine = filters.cuisine;
    }
    if (filters.priceRange) {
        parsedFilters.priceRange = new RegExp(`^\\\${1,${filters.priceRange}}$`, 'g');
    }
    
    // Parsing as any since in Restaurant, rating is a number (as it should)
    // But when coming from query string, it comes as string
    if (filters.rating) {
        parsedFilters.rating = { $gte: parseInt(filters.rating as any) };
    }

    const count = await RestaurantModel
        .countDocuments(parsedFilters)
        .exec();

    const results = await RestaurantModel
        .find(parsedFilters)
        .limit(limit)
        .skip(offset)
        .sort({ [order]: sort })
        .exec();

    return { count, results };
}

export async function listRestaurants(
    order: keyof Restaurant = 'name',
    sort: 'asc'|'desc' = 'asc',
    offset: number = 0, 
    limit: number = 20
): Promise<ListResponse<HydratedDocument<Restaurant>>> {
    return searchRestaurants({}, order, sort, offset, limit);
}