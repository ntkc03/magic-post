import expressAsyncHandler from "express-async-handler";
import { consolidationDbInterface, consolidationDbRepository } from "../../app/repositories/consolidationDbRepository";
import { ConsolidationModel } from "../../frameworks/database/mongoDb/models/consolidationModel";
import { consolidationRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/consolidationRepositoryMongoDB";
import { Request, Response } from "express";
import { CustomRequest } from "../../types/expressRequest";
import { findConsolidationByAddress, findConsolidationByID, findAllConsolidations, setManager } from "../../app/useCases/consolidation/consolidation";
import AppError from "../../utils/appError";
import { HttpStatus } from "../../types/httpStatus";
import { consolidationInterface } from "../../types/consolidationInterface";

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

    const setTheManager = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const customReq = req as CustomRequest;
            const id = customReq.payload ?? "";
            if (!id) {
                throw new AppError(
                    "unauthorized request, invalid token",
                    HttpStatus.UNAUTHORIZED
                );
            }
            const updates: consolidationInterface = req.body;
            const updateConsolidationData = await setManager(
                id,
                updates,
                dbRepositoryConsolidation
            );

            res.json({
                status: "success",
                updateConsolidationData,
            });
        }
    );

    return {
        getConsolidationByAddress,
        getConsolidationByID,
        getConsolidationByIDParam,
        getAllConsolidations,
        setTheManager
    }
};

export default consolidationController;