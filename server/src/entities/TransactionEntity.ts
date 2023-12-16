import { TransactionModel } from "../frameworks/database/mongoDb/models/transactionModel";
import { transactionInterface } from "../types/transactionInterface";

export class TransactionEntity {
    private model: TransactionModel;

    constructor(model: TransactionModel) {
        this.model = model;
    }

    public async getTransactionByAddress(address: string): Promise<transactionInterface | null> {
        const transaction = await this.model.findOne({ address: address });
        return transaction;
    }

    public async getTransactionByID(id: string): Promise<transactionInterface | null> {
        const transaction = await this.model.findById(id);
        return transaction;
    }

    public async getTransactionsByConsolidation(consolidation: string): Promise<transactionInterface[] | null> {
        const transactions = await this.model.find({ consolidation: consolidation });
        return transactions;
    }

    public async getAllTransactions(): Promise<transactionInterface[]> {
        const allTransactions = await this.model.find();
        return allTransactions;
    }

    public async updateTheTransaction(transactionID: string, updates: Partial<transactionInterface>): Promise<transactionInterface | null> {
        try {
            const transaction = await this.model.findById(transactionID);

            if (!transaction) {
                // Order not found
                throw new Error("transaction not found");
                return null;
            }
            Object.assign(transaction, updates);

            // Save the updated order to the database
            const updatedTransaction = await transaction.save();
            return updatedTransaction.toObject(); // Convert Mongoose document to plain JavaScript object
        } catch (error) {
            // Handle errors, e.g., log them or throw a custom error
            console.error('Error updating order status:', error);
            throw error;
        }
    }
}