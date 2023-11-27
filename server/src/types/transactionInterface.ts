import { Types } from "mongoose";

export interface transactionInterface {
    _id?: Types.ObjectId,
    address?: string
    consolidationID?: string
}