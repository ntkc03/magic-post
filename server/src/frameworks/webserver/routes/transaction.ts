import express from "express";
import roleMiddleware from "../middleware/roleMiddleware";
import transactionController from "../../../adapters/controllers/transactionController";
import { transactionDbRepository } from "../../../app/repositories/transactionDbRepository";
import { transactionRepositoryMongoDB } from "../../database/mongoDb/repositories/transactionRepositoryMongoDB";
import { Transaction } from "../../database/mongoDb/models/transactionModel";


const transactionRoute = () => {
    const route = express.Router();

    const controller = transactionController(
        transactionDbRepository,
        transactionRepositoryMongoDB,
        Transaction
    );

    route.get('transaction-data/address', controller.getTheTransactionByAddress);
    route.get('transaction-data/consolidation', controller.getTheTransactionByConsolidation);
    route.get('transaction-data/:id', controller.getTheTransactionByID);
    route.get('all-transactions', controller.findAllTransactions);

    return route;
}

export default transactionRoute;