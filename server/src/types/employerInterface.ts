import { Types } from "mongoose";

export interface employerInterface {
    _id?: Types.ObjectId,
    name?: string,
    username?: string,
    password?: string,
    role?: string,
    phone?: string,
    transactionID?: string,
    consolidationID?: string,
}