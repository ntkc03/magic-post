import { type } from "os";
import { transactionRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/transactionRepositoryMongoDB";

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
    const getTransactionsByConsolidationByID = async (id: string) => {
        const transactions = repository.getTransactionsByConsolidationByID(id);
        return transactions;
    }
    const getAllTransactions = async () => {
        const transactions = repository.getAllTransactions();
        return transactions;
    }

    return {
        getTransactionByAddress,
        getTransactionByID,
        getTransactionsByConsolidationByID,
        getAllTransactions
    }
}

export type transactionDbInterface = typeof transactionDbRepository;