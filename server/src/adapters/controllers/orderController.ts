import expressAsyncHandler from "express-async-handler";
import { orderDbInterface, orderDbRepository } from "../../app/repositories/orderDbRepository";
import { OrderModel } from "../../frameworks/database/mongoDb/models/orderModel";
import { orderRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/orderRepositoryMongoDB";
import { orderInterface } from "../../types/orderInterface";
import { Request, Response } from "express";
import { createOrder, deleteOrder, filterOrder, getAllOrders, getOrderByCode, getOrderByConsolidationID, getOrderByDeliveryPersonID, getOrderByTransationID, updateOrder } from "../../app/useCases/order/order";
import { HttpStatus } from "../../types/httpStatus";
import AppError from "../../utils/appError";
import { CustomRequest } from "../../types/expressRequest";

export const orderController = (
    orderDbRepository: orderDbInterface,
    orderDbRepositoryImpl: orderRepositoryMongoDB,
    orderModel: OrderModel
) => {
    const dbRepositoryOrder = orderDbRepository(orderDbRepositoryImpl(orderModel));

    const orderCreate = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const order: orderInterface = req.body;
            const createdOrder = await createOrder(order, dbRepositoryOrder);
            if (!createdOrder) {
                throw new AppError(
                    "Order creation failed",
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }
            res.json({
                status: "success",
                message: "Order created successfully",
                order: createOrder,
            });
        }
    )

    const orderDelete = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const customReq = req as CustomRequest;
            const id = customReq.payload ?? "";
            await deleteOrder(id, dbRepositoryOrder);
            res.json({
                status: "success",
                message: "order deleted successfully",
            });
        }
    )

    const getTheOrderByCode = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const { code } = req.body;
            const order = await getOrderByCode(code, dbRepositoryOrder);
            res.json(order);
        }
    )

    const getTheOrderByConsolidationID = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const { consolidationID } = req.body;
            const order = await getOrderByConsolidationID(consolidationID, dbRepositoryOrder);
            res.json(order);
        }
    )

    const getTheOrderByTransactionID = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const { transactionID } = req.body;
            const order = await getOrderByTransationID(transactionID, dbRepositoryOrder);
            res.json(order);
        }
    )

    const getTheOrderByDeliveryPersonID = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const { deliveryPersonID } = req.body;
            const order = await getOrderByDeliveryPersonID(deliveryPersonID, dbRepositoryOrder);
            res.json(order);
        }
    )

    const findAllJOrders = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const allOrders = await getAllOrders(dbRepositoryOrder);
            res.json({
                status: "success",
                allOrders
            })
        }
    );

    const filterTheOrders = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const { create_at, sended_at, transactionID, consolidationID } = req.body;
            const jobs = await filterOrder(create_at, sended_at, transactionID, consolidationID, dbRepositoryOrder);

            res.json({
                status: 'success',
                jobs
            })
        }
    )

    const updateOrderStatus = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const customReq = req as CustomRequest;
            const orderId = customReq.payload ?? "";
            if (!orderId) {
                throw new AppError(
                    "unauthorized request, invalid token",
                    HttpStatus.UNAUTHORIZED
                );
            }
            const updates: orderInterface = req.body;
            const updateOrderData = await updateOrder(
                orderId,
                updates,
                dbRepositoryOrder
            );

            res.json({
                status: "success",
                updateOrderData,
            });
        }
    );

    return {
        orderCreate,
        orderDelete,
        getTheOrderByCode,
        getTheOrderByConsolidationID,
        getTheOrderByTransactionID,
        getTheOrderByDeliveryPersonID,
        findAllJOrders,
        filterTheOrders,
        updateOrderStatus
    }
}
export default orderController;