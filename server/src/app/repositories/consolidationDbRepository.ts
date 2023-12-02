import { consolidationRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/consolidationRepositoryMongoDB";
import { consolidationInterface } from "../../types/consolidationInterface";

export const consolidationDbRepository = (repository: ReturnType<consolidationRepositoryMongoDB>) => {
    const getConsolidationByAddress = async (address: string) => {
        const consolidation = await repository.getConsolidationByAddress(address);
        return consolidation;
    }

    //get consolidation by id
    const getConsolidationByID = async (id: string) => {
        const consolidation = await repository.getConsolidationByID(id);
        return consolidation;
    }

    // get all consolidations
    const getAllConsolidations = async () => {
        const consolidations = await repository.getAllConsolidations();
        return consolidations;
    }

    return {
        getConsolidationByAddress,
        getConsolidationByID,
        getAllConsolidations
    }
}

export type consolidationDbInterface = typeof consolidationDbRepository;