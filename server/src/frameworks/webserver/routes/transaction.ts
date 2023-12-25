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

    route.get('/transaction-data/:consolidation/:address',controller.getTheTransactionByAddress);
    route.get('/transaction-data-cons/:consolidation',controller.getTheTransactionByConsolidation);
    route.get('/transaction-data/:id',controller.getTheTransactionByID);
    route.get('/all-transactions',controller.findAllTransactions);
    route.put('/update-transaction',controller.updateTheTransaction);

    return route;
}

export default transactionRoute;