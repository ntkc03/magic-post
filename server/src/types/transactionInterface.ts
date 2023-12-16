import { Types } from "mongoose";

export interface transactionInterface {
    _id?: Types.ObjectId,
    address?: string,
    consolidation?: string,
    manager?: string,
    quantity?: number
}