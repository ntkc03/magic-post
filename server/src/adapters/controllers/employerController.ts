import expressAsyncHandler from "express-async-handler";
import { employerDbInterface } from "../../app/repositories/employerDbRepository";
import { EmployerModel } from "../../frameworks/database/mongoDb/models/employerModel";
import { employerRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/employerRepositoryMongoDB";
import { Request, Response } from "express";
import { deleteEmployer, deleteEmployerById, findAllEmployers, findEmployerById, findEmployerByTransationID, findEmployerByUsername } from "../../app/useCases/employer/employer";
import { CustomRequest } from "../../types/expressRequest";
import { employerInterface } from "../../types/employerInterface";
import AppError from "../../utils/appError";
import { HttpStatus } from "../../types/httpStatus";

export const employerController = (
    employerDbRepository: employerDbInterface,
    employerDbRepositoryImpl: employerRepositoryMongoDB,
    employerModel: EmployerModel
) => {
    const dbRepositoryEmployer = employerDbRepository(employerDbRepositoryImpl(employerModel));

    const getEmployerByUsername = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const { username } = req.body;
            const employer = await findEmployerByUsername(username, dbRepositoryEmployer);
            res.json(employer);
        }
    )

    const getEmployerById = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const customReq = req as CustomRequest;
            const id = customReq.payload ?? "";
            const employer = await findEmployerById(id, dbRepositoryEmployer);
            res.json(employer);
        }
    )
    const getEmployerByTransationID = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const { transactionID } = req.body;
            const employer = await findEmployerByTransationID(transactionID, dbRepositoryEmployer);
            res.json(employer);
        }
    )
    const getEmployerByConsolidationID = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const { consolidationID } = req.body;
            const employer = await findEmployerByTransationID(consolidationID, dbRepositoryEmployer);
            res.json(employer);
        }
    )
    const getAllEmployers = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const allEmployers = await findAllEmployers(dbRepositoryEmployer);
            res.json({
                status: "success",
                allEmployers
            })
        }
    )

    const deleteTheEmployer = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const { username } = req.params;
            console.log(username);
            await deleteEmployer(username, dbRepositoryEmployer);

            res.json({
                status: "success",
                message: "employer deleted successfully"
            });
        }
    )

    const deleteTheEmployerById = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const customReq = req as CustomRequest;
            const id = customReq.payload ?? "";
            await deleteEmployerById(id, dbRepositoryEmployer);
            res.json({
                status: "success",
                message: "employer deleted successfully"
            });
        }
    )

    return{
        getEmployerByUsername,
        getEmployerById,
        getEmployerByTransationID,
        getEmployerByConsolidationID,
        getAllEmployers,
        deleteTheEmployer,
        deleteTheEmployerById
    }
}

export default employerController;
 