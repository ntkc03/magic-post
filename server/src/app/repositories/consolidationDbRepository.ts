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

    const updateManager = async(consolidationID: string, updates: Partial<consolidationInterface>) =>{
        const consolidation = await repository.updateManager(consolidationID,updates);
        return consolidation;
    }

    return {
        getConsolidationByAddress,
        getConsolidationByID,
        getAllConsolidations,
        updateManager
    }
}

export type consolidationDbInterface = typeof consolidationDbRepository;