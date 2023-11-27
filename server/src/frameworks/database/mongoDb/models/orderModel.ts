import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    code: {
        type: String
    },

    senderName: {
        type: String
    },
    senderAddress: {
        type: String
    },
    senderLocal: {
        type: String
    },
    senderCity: {
        type: String
    },
    senderCountry: {
        type: String
    },
    senderPhone: {
        type: String
    },

    receiverName: {
        type: String
    },
    receiverAddress: {
        type: String
    },
    receiverLocal: {
        type: String
    },
    receiverCity: {
        type: String
    },
    receiverCountry: {
        type: String
    },
    receiverPhone: {
        type: String
    },
    type: {
        type: Boolean
    },
    specialService: {
        type: String
    },
    cannotDilvered: {
        type: Number
    },
    mainFee: {
        type: Number
    },
    additionalFee: {
        type: Number
    },
    GTGTFee: {
        type: Number
    },
    VAT: {
        type: Number
    },
    otherFee: {
        type: Number
    },
    sumFee: {
        type: Number
    },
    COD: {
        type: Number
    },
    other: {
        type: Number
    },
    sum: {
        type: Number
    },
    weight: {
        type: Number
    },
    transWeight: {
        type: Number
    },
    note: {
        type: String
    },
    create_at: {
        type: Date,
        default: Date.now
    },
    sended_at: {
        type: Date
    },
    status: {
        type: Number
    },
    consolidationID: {
        type: String
    },
    transactionID: {
        type: String
    },
    deliveryPersonID: {
        type: String
    },

})

export const Order = model("Order", orderSchema, "orders")
export type OrderModel = typeof Order;