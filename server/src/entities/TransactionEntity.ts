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

    public async getTransactionsByConsolidationByID(id: string): Promise<transactionInterface[] | null> {
        const transactions: any = await this.model.find({ consolidationID: id });
        return transactions;
    }

    public async getAllTransactions(): Promise<transactionInterface[]> {
        const allTransactions = await this.model.find();
        return allTransactions;
    }
}