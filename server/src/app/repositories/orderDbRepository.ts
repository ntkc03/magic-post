import { type } from "os";
import { orderRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/orderRepositoryMongoDB";
import { orderInterface } from "../../types/orderInterface";

export const orderDbRepository = (repository: ReturnType<orderRepositoryMongoDB>) => {
    const createOrder = async (order: orderInterface) => {
        const newOrder = await repository.createOrder(order);
        return newOrder;
    }
    const deleteOrder = async (orderId: string) => {
        await repository.deleteOrder(orderId);
    }
    const getOrderByCode = async (code: string) => {
        const order = await repository.getOrderByCode(code);
        return order;
    }
    const getOrderByConsolidationID = async (id: string) => {
        const orders = await repository.getOrderByConsolidationID(id);
        return orders;
    }
    const getOrderByTransationID = async (id: string) => {
        const orders = await repository.getOrderByTransationID(id);
        return orders;
    }
    const getOrderByDeliveryPersonID = async (id: string) => {
        const orders = await repository.getOrderByDeliveryPersonID(id);
        return orders;
    }
    const getAllOrders = async () => {
        const orders = await repository.getAllOrders();
        return orders;
    }
    const filterOrder = async (create_at: Date, sended_at: Date, transactionID: string, consolidationID: string) => {
        const orders = await repository.filterOrder(create_at, sended_at, transactionID, consolidationID);
        return orders;
    }
    const updateOrderStatus = async (id: string, order: Partial<orderInterface>) => {
        const updatedOrder: any = repository.updateOrderStatus(id, order);
        return updatedOrder;
    }

    return {
        createOrder,
        deleteOrder,
        getOrderByCode,
        getOrderByTransationID,
        getOrderByConsolidationID,
        getOrderByDeliveryPersonID,
        getAllOrders,
        filterOrder,
        updateOrderStatus
    }
}

export type orderDbInterface = typeof orderDbRepository;