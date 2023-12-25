import express from "express";
import roleMiddleware from "../middleware/roleMiddleware";
import transactionController from "../../../adapters/controllers/transactionController";
import { transactionDbRepository } from "../../../app/repositories/transactionDbRepository";
import { transactionRepositoryMongoDB } from "../../database/mongoDb/repositories/transactionRepositoryMongoDB";
import { Transaction } from "../../database/mongoDb/models/transactionModel";
import authenticationMiddleware from "../middleware/authenticationMiddleware";

const employerMiddleware = roleMiddleware('employer');

const transactionRoute = () => {
    const route = express.Router();

    const controller = transactionController(
        transactionDbRepository,
        transactionRepositoryMongoDB,
        Transaction
    );

    route.get('/transaction-data/:consolidation/:address',authenticationMiddleware,employerMiddleware, controller.getTheTransactionByAddress);
    route.get('/transaction-data-cons/:consolidation',authenticationMiddleware,employerMiddleware, controller.getTheTransactionByConsolidation);
    route.get('/transaction-data/:id',authenticationMiddleware,employerMiddleware, controller.getTheTransactionByID);
    route.get('/all-transactions',authenticationMiddleware,employerMiddleware, controller.findAllTransactions);
    route.put('/update-transaction',authenticationMiddleware,employerMiddleware,controller.updateTheTransaction);

    return route;
}

export default transactionRoute;