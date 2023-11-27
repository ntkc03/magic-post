import { Schema, model } from "mongoose";

const employerSchema = new Schema({
    username: {
        type: String,
        require: [true, "please enter username"]
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    phone: {
        type: String,
        require: true
    },
    transactionID: {
        type: String,
        require: false
    },
    consolidationID: {
        type: String,
        require: false
    }
})

export const Employer = model("Employer", employerSchema, "employers")
export type EmployerModel = typeof Employer;