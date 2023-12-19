import { Request, Response } from "express";
import { orderDbInterface, orderDbRepository } from "../../app/repositories/orderDbRepository";
import { transactionDbInterface } from "../../app/repositories/transactionDbRepository";
import { TransactionModel } from "../../frameworks/database/mongoDb/models/transactionModel";
import { transactionRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/transactionRepositoryMongoDB";
import { getAllTransactions, getTransactionByAddress, getTransactionByID, getTransactionsByConsolidation, updateTransaction } from "../../app/useCases/transaction/transaction";
import { CustomRequest } from "../../types/expressRequest";
import expressAsyncHandler from "express-async-handler";
import AppError from "../../utils/appError";
import { HttpStatus } from "../../types/httpStatus";
import { transactionInterface } from "../../types/transactionInterface";

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

    const getTheTransactionByConsolidation = (
        async (req: Request, res: Response) => {
            const {consolidation} = req.params;
            const transactions = await getTransactionsByConsolidation(consolidation, dbRepositoryTransaction);
            res.json(transactions);
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

    const updateTheTransaction = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const customReq = req as CustomRequest;
            const id = customReq.body ?? "";
            if (!id) {
                throw new AppError(
                    "unauthorized request, invalid token",
                    HttpStatus.UNAUTHORIZED
                );
            }
            const updates: transactionInterface = req.body;
            const updateTransactionData = await updateTransaction(
                id,
                updates,
                dbRepositoryTransaction
            );

            res.json({
                status: "success",
                updateTransactionData,
            });
        }
    )

    return {
        getTheTransactionByAddress,
        getTheTransactionByConsolidation,
        getTheTransactionByID,
        findAllTransactions,
        updateTheTransaction
    }
}

export default transactionController;