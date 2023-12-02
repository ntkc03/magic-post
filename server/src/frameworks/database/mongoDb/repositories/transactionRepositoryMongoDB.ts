import { type } from "os";
import { TransactionEntity } from "../../../../entities/TransactionEntity";
import { TransactionModel } from "../models/transactionModel";

export const transactionRepositoryMongoDB = (model: TransactionModel) => {
    const transactionEntity = new TransactionEntity(model);

    const getTransactionByAddress = async (address: string) => {
        const transaction = transactionEntity.getTransactionByAddress(address);
        return transaction;
    }
    const getTransactionByID = async (id: string) => {
        const transaction = transactionEntity.getTransactionByID(id);
        return transaction;
    }
    const getTransactionsByConsolidationByID = async (id: string) => {
        const transactions = transactionEntity.getTransactionsByConsolidationByID(id);
        return transactions;
    }
    const getAllTransactions = async () => {
        const transactions = transactionEntity.getAllTransactions();
        return transactions;
    }

    return {
        getTransactionByAddress,
        getTransactionByID,
        getTransactionsByConsolidationByID,
        getAllTransactions
    }
}

export type transactionRepositoryMongoDB = typeof transactionRepositoryMongoDB;