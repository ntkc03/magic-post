import express from 'express';
import consolidationController from '../../../adapters/controllers/consolidationController';
import { consolidationDbRepository } from '../../../app/repositories/consolidationDbRepository';
import { consolidationRepositoryMongoDB } from '../../database/mongoDb/repositories/consolidationRepositoryMongoDB';
import { Consolidation } from '../../database/mongoDb/models/consolidationModel';


const consolidationRoute = () => {
    const route = express.Router();

    const controller = consolidationController(
        consolidationDbRepository,
        consolidationRepositoryMongoDB,
        Consolidation
    );

    route.get('/consolidation-data/address',controller.getConsolidationByAddress);
    route.get('/consolidation-data/cons-id',controller.getConsolidationByID);
    route.get('/consolidation-data/:id',controller.getConsolidationByIDParam);
    route.get('/all-consolidations',controller.getAllConsolidations);
    route.put('/update-consolidation',controller.updateTheConsolidation);

return route;
}

export default consolidationRoute;