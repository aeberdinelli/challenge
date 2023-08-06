import { Restaurant } from "../models/restaurant.model";

export interface ListParams {
    offset?: number;
    limit?: number;
}

export interface SearchParams<GenericType> extends ListParams {
    order?: keyof GenericType;
    sort?: 'asc'|'desc';
}

export interface RestaurantSearchParams extends SearchParams<Restaurant>, Partial<Restaurant> {};

export interface ListResponse<GenericType> {
    count: number;
    results: GenericType[];
}