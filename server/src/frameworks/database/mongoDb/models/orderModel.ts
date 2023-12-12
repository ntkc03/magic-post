import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    code: {
        type: String
    },

    senderName: {
        type: String
    },
    senderCountry: {
        type: String
    },
    senderCity: {
        type: String
    },
    senderDistrict: {
        type: String
    },
    senderCommunes: {
        type: String
    },

    senderVillage: {
        type: String
    },
    senderHouseNumber: {
        type: String
    },
    senderPhone: {
        type: String
    },
    receiverName: {
        type: String
    },
    receiverCountry: {
        type: String
    },
    receiverDistrict: {
        type: String
    },
    receiverNeighborhood: {
        type: String
    },
    receiverVillage: {
        type: String
    },
    receiverHouseNumber: {
        type: String
    },
    receiverCity: {
        type: String
    },
    receiverPhone: {
        type: String
    },
    type: {
        type: Boolean
    },
    specialService: {
        type: Array
    },
    cannotDelivered: {
        type: String
    },
    items: {
        type: Array
    },
    estimatedTime: {
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
    cost: {
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
        type: Array
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