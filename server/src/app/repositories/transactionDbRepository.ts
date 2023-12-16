import { type } from "os";
import { transactionRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/transactionRepositoryMongoDB";
import { transactionInterface } from "../../types/transactionInterface";

export const transactionDbRepository = (
    repository: ReturnType<transactionRepositoryMongoDB>
) => {
    const getTransactionByAddress = async (address: string) => {
        const transaction = repository.getTransactionByAddress(address);
        return transaction;
    }
    const getTransactionByID = async (id: string) => {
        const transaction = repository.getTransactionByID(id);
        return transaction;
    }
    const getTransactionsByConsolidation = async (consolidation: string) => {
        const transactions = repository.getTransactionsByConsolidation(consolidation);
        return transactions;
    }
    const getAllTransactions = async () => {
        const transactions = repository.getAllTransactions();
        return transactions;
    }

    const updateTheTransaction = async(transactionID: string, updates: Partial<transactionInterface>) =>{
        const transaction = await repository.updateTheTransaction(transactionID,updates);
        return transaction;
    }

    return {
        getTransactionByAddress,
        getTransactionByID,
        getTransactionsByConsolidation,
        getAllTransactions,
        updateTheTransaction
    }
}

export type transactionDbInterface = typeof transactionDbRepository;