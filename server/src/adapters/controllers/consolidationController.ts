import expressAsyncHandler from "express-async-handler";
import { consolidationDbInterface, consolidationDbRepository } from "../../app/repositories/consolidationDbRepository";
import { ConsolidationModel } from "../../frameworks/database/mongoDb/models/consolidationModel";
import { consolidationRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/consolidationRepositoryMongoDB";
import { Request, Response } from "express";
import { CustomRequest } from "../../types/expressRequest";
import { findConsolidationByAddress, findConsolidationByID, findAllConsolidations } from "../../app/useCases/consolidation/consolidation";

const consolidationController = (
    consolidationDbRepository: consolidationDbInterface,
    consolidationDbRepositoryImpl: consolidationRepositoryMongoDB,
    consolidationModel: ConsolidationModel
) => {
    const dbRepositoryConsolidation = consolidationDbRepository(consolidationDbRepositoryImpl(consolidationModel));

    const getConsolidationByAddress = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const { address } = req.body;
            const consolidation = await findConsolidationByAddress(address, dbRepositoryConsolidation);
            res.json(consolidation);
        }
    )

    const getConsolidationByID = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const customReq = req as CustomRequest;
            const id = customReq.payload ?? "";
            const consolidation = await findConsolidationByID(id, dbRepositoryConsolidation);
            res.json(consolidation);
        }
    )

    const getConsolidationByIDParam = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const id = req.params.id;
            const consolidation = await findConsolidationByID(id, dbRepositoryConsolidation);
            res.json(consolidation);
        }
    )

    const getAllConsolidations = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const allConsolidations = await findAllConsolidations(dbRepositoryConsolidation);
            res.json({
                status: "success",
                allConsolidations
            })
        }
    )

    return {
        getConsolidationByAddress,
        getConsolidationByID,
        getConsolidationByIDParam,
        getAllConsolidations
    }
};

export default consolidationController;