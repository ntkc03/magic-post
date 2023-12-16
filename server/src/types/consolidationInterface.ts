import { Types } from "mongoose";

export interface consolidationInterface {
    _id?: Types.ObjectId,
    address?: string,
    city?: string,
    country?: string,
    manager?: string,
    quantity?: number
}