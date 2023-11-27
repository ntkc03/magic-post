import { Schema, model } from "mongoose";

const consolidationSchema = new Schema({
    address: {
        type: String
    }
})

export const Consolidation = model("Consolidation", consolidationSchema, "consolidations")
export type ConsolidationModel = typeof Consolidation;