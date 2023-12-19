import { consolidationInterface } from "../../../types/consolidationInterface";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { consolidationDbInterface } from "../../repositories/consolidationDbRepository";

export const findConsolidationByAddress = async (
    address: string,
    consolidationRepository: ReturnType<consolidationDbInterface>
) => {
    try {
        const result = await consolidationRepository.getConsolidationByAddress(address);
        if (!result) {
            throw new AppError("Consolidation point not found", HttpStatus.BAD_REQUEST);
        }
        return result;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to find consolidation point")
    }
}

export const findConsolidationByID = async (
    id: string,
    consolidationRepository: ReturnType<consolidationDbInterface>
) => {
    try {
        const result = await consolidationRepository.getConsolidationByID(id);
        if (!result) {
            throw new AppError("consolidation point not found", HttpStatus.BAD_REQUEST);
        }
        return result;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to find consolidation point")
    }
}

export const findAllConsolidations = async (
    consolidationRepository: ReturnType<consolidationDbInterface>
) => {
    try {
        const result = await consolidationRepository.getAllConsolidations();
        return result;
    } catch (error) {
        console.log(error)
        throw new Error("failed to get all consolidation points")
    }
}

export const updateConsolidation = async (
    id: string,
    updates: Partial<consolidationInterface>,
    consolidationRepository: ReturnType<consolidationDbInterface>,
)=>{
    try {
        const result = await consolidationRepository.updateConsolidation(id,updates);
        return result;
    } catch (error) {
        console.log(error)
        throw new Error("failed to get all consolidation points")
    }
}

