import { Request, Response } from "express";
import { getAllCities } from "../repositories/city.repository";
import { ListParams } from "../types/common";

export async function getCities(req: Request<{}, {}, {}, ListParams>, res: Response) {
    const cities = await getAllCities();

    return res.status(200).json(cities);
}