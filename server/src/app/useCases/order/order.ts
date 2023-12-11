import { HttpStatus } from "../../../types/httpStatus";
import { orderInterface } from "../../../types/orderInterface";
import AppError from "../../../utils/appError";
import { orderDbInterface } from "../../repositories/orderDbRepository";

export const createOrder = async (
    order: orderInterface,
    orderRepository: ReturnType<orderDbInterface>
) => {
    try {
        console.log("hi")
        const result = await orderRepository.createOrder(order);
        return result;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to create order")
    }
}

export const deleteOrder = async (
    id: string,
    orderRepository: ReturnType<orderDbInterface>
) => {
    try {
        await orderRepository.deleteOrder(id);
    } catch (error) {
        console.log(error)
        throw new Error("failed to delete the order");
    }
}

export const getOrderByCode = async (
    code: string,
    orderRepository: ReturnType<orderDbInterface>
) => {
    try {
        const result = await orderRepository.getOrderByCode(code);
        if (!result) {
            throw new AppError("order not found", HttpStatus.BAD_REQUEST);
        }
        return result;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to find order")
    }
}
export const getOrderByConsolidationID = async (
    id: string,
    orderRepository: ReturnType<orderDbInterface>
) => {
    try {
        const result = await orderRepository.getOrderByConsolidationID(id);
        if (!result) {
            throw new AppError("order not found", HttpStatus.BAD_REQUEST);
        }
        return result;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to find order")
    }
}

export const getOrderByTransationID = async (
    id: string,
    orderRepository: ReturnType<orderDbInterface>
) => {
    try {
        const result = await orderRepository.getOrderByTransationID(id);
        if (!result) {
            throw new AppError("order not found", HttpStatus.BAD_REQUEST);
        }
        return result;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to find order")
    }
}

export const getOrderByDeliveryPersonID = async (
    id: string,
    orderRepository: ReturnType<orderDbInterface>
) => {
    try {
        const result = await orderRepository.getOrderByDeliveryPersonID(id);
        if (!result) {
            throw new AppError("order not found", HttpStatus.BAD_REQUEST);
        }
        return result;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to find order")
    }
}

export const getAllOrders = async (
    consolidationRepository: ReturnType<orderDbInterface>
) => {
    try {
        const result = await consolidationRepository.getAllOrders();
        return result;
    } catch (error) {
        console.log(error)
        throw new Error("failed to get orders")
    }
}

export const filterOrder = async (
    create_at: Date,
    sended_at: Date,
    transactionID: string,
    consolidationID: string,
    orderRepository: ReturnType<orderDbInterface>
) => {
    try {
        const jobs = await orderRepository.filterOrder(create_at, sended_at, transactionID, consolidationID);
        return jobs;
    } catch (error) {
        throw new AppError('could not find any results', HttpStatus.NOT_FOUND);
    }
}

export const updateOrder = async (
    id: string,
    order: Partial<orderInterface>,
    orderRepository: ReturnType<orderDbInterface>
) => {
    try {
        const updatedJob = await orderRepository.updateOrderStatus(id, order);
        return updatedJob;
    } catch (error) {
        throw new Error("failed to update the job");
    }
}

