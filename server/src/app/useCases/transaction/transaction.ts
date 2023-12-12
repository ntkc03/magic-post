import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { transactionDbInterface } from "../../repositories/transactionDbRepository";

export const getTransactionByAddress = async (
    address: string,
    transactionRepository: ReturnType<transactionDbInterface>
) => {
    try {
        const result = await transactionRepository.getTransactionByAddress(address);
        if (!result) {
            throw new AppError("transaction point not found", HttpStatus.BAD_REQUEST);
        }
        return result;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to find transaction point")
    }
}

export const getTransactionByID = async (
    id: string,
    transactionRepository: ReturnType<transactionDbInterface>
) => {
    try {
        const result = await transactionRepository.getTransactionByID(id);
        if (!result) {
            throw new AppError("transaction point not found", HttpStatus.BAD_REQUEST);
        }
        return result;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to find transaction point")
    }
}

export const getTransactionsByConsolidation = async (
    consolidation: string,
    transactionRepository: ReturnType<transactionDbInterface>
) => {
    try {
        const result = await transactionRepository.getTransactionsByConsolidation(consolidation);
        if (!result) {
            throw new AppError("transaction point not found", HttpStatus.BAD_REQUEST);
        }
        return result;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to find transaction points")
    }
}

export const getAllTransactions = async (
    transactionRepository: ReturnType<transactionDbInterface>
) => {
    try {
        const result = await transactionRepository.getAllTransactions();
        return result;
    } catch (error) {
        console.log(error)
        throw new Error("failed to get all transaction points")
    }
}

