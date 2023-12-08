import express from "express";
import roleMiddleware from "../middleware/roleMiddleware";
import employerController from "../../../adapters/controllers/employerController";
import { employerDbRepository } from "../../../app/repositories/employerDbRepository";
import { employerRepositoryMongoDB } from "../../database/mongoDb/repositories/employerRepositoryMongoDB";
import { Employer } from "../../database/mongoDb/models/employerModel";


const employerMiddleware = roleMiddleware('employer');

const employerRoute = () => {
    const route = express.Router();

    const controller = employerController(
        employerDbRepository,
        employerRepositoryMongoDB,
        Employer
    );
    route.get('/employer-data/username',employerMiddleware,controller.getEmployerByUsername);
    route.get('/employer-data/emp-id',employerMiddleware,controller.getEmployerById);
    route.get('/employer-data/transaction-id',employerMiddleware,controller.getEmployerByTransationID);
    route.get('/employer-data/consolidation-id',employerMiddleware,controller.getEmployerByConsolidationID);
    route.get('/all-employers',employerMiddleware,controller.getAllEmployers);
    route.delete('/delete-employer',employerMiddleware,controller.deleteTheEmployer);
    route.delete('/delete-employer/:id',employerMiddleware,controller.deleteTheEmployerById);

    return route;
}

export default employerRoute;