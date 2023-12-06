import { Request, Response } from "express";
import { orderDbInterface, orderDbRepository } from "../../app/repositories/orderDbRepository";
import { transactionDbInterface } from "../../app/repositories/transactionDbRepository";
import { TransactionModel } from "../../frameworks/database/mongoDb/models/transactionModel";
import { transactionRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/transactionRepositoryMongoDB";
import { getAllTransactions, getTransactionByAddress, getTransactionByID, getTransactionsByConsolidationID } from "../../app/useCases/transaction/transaction";
import { CustomRequest } from "../../types/expressRequest";

const transactionController = (
    transactionDbRepository: transactionDbInterface,
    transactionDbRepositoryImpl: transactionRepositoryMongoDB,
    transactionModel: TransactionModel
) => {
    const dbRepositoryTransaction = transactionDbRepository(transactionDbRepositoryImpl(transactionModel));

    const getTheTransactionByAddress = (
        async (req: Request, res: Response) => {
            const { address } = req.body;
            const transaction = await getTransactionByAddress(address, dbRepositoryTransaction);
            res.json(transaction);
        }
    )

    const getTheTransactionByConsolidationID = (
        async (req: Request, res: Response) => {
            const { consolidationID } = req.body;
            const transaction = await getTransactionsByConsolidationID(consolidationID, dbRepositoryTransaction);
            res.json(transaction);
        }
    )

    const getTheTransactionByID = (
        async (req: Request, res: Response) => {
            const customReq = req as CustomRequest;
            const id = customReq.payload ?? "";
            const transaction = await getTransactionByID(id, dbRepositoryTransaction);
            res.json(transaction);
        }
    )

    const findAllTransactions = (
        async (req: Request, res: Response) => {
            const allTransactions = await getAllTransactions(dbRepositoryTransaction);
            res.json({
                status: "success",
                allTransactions
            })
        }
    )
}