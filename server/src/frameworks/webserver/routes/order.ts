import express from "express";
import roleMiddleware from "../middleware/roleMiddleware";
import orderController from "../../../adapters/controllers/orderController";
import { orderDbRepository } from "../../../app/repositories/orderDbRepository";
import { orderRepositoryMongoDB } from "../../database/mongoDb/repositories/orderRepositoryMongoDB";
import { Order } from "../../database/mongoDb/models/orderModel";
import { upload } from "../middleware/multerCloudinary";

const employerMiddleware = roleMiddleware('employer');

const orderRoute = () => {
    const route = express.Router();

    const controller = orderController(
        orderDbRepository,
        orderRepositoryMongoDB,
        Order
    );

    route.post('/create',employerMiddleware,controller.orderCreate);
    route.delete('/delete',employerMiddleware,controller.orderDelete);
    route.get('/find-order/code',controller.getTheOrderByCode);
    route.get('/find-order/consolidation-id',controller.getTheOrderByConsolidationID);
    route.get('/find-order/transactions-id',controller.getTheOrderByTransactionID);
    route.get('/find-order/deliveryPerson-id',controller.getTheOrderByDeliveryPersonID);
    route.get('/all-orders',employerMiddleware,controller.findAllJOrders);
    route.post('/filter-orders',employerMiddleware ,controller.filterTheOrders);
    route.put('/update-employer',employerMiddleware,upload,controller.updateOrderStatus);


return route;
}

export default orderRoute;