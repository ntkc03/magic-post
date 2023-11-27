import { Schema, model } from "mongoose";

const transactionSchema = new Schema({
    address: {
        type: String
    },
    consolidationID: {
        type: String
    }
})

export const Transaction = model("Transaction", transactionSchema, "transactions")
export type TransactionModel = typeof Transaction;