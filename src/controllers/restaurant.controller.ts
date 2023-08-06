import { Request, Response } from "express";
import { createRestaurant, searchRestaurants } from "../repositories/restaurant.repository";
import { RestaurantSearchParams } from "../types/common";

export async function postRestaurant(req: Request, res: Response) {
    try {
        const restaurant = await createRestaurant(req.body);
    
        return res.status(201).json(restaurant);
    } catch (err) {
        // TODO: Make mongoose validation errors prettier
        return res.status(400).json(err);
    }
}

export async function getRestaurants(req: Request<{}, {}, {}, RestaurantSearchParams>, res: Response) {
    const { offset, limit, order, sort, ...filters } = req.query;
    const restaurants = await searchRestaurants(filters, order || 'name', sort || 'asc', offset || 0, limit);

    return res.status(200).json(restaurants);
}