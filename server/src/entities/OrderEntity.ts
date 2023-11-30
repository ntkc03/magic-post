import { OrderModel } from "../frameworks/database/mongoDb/models/orderModel";
import { orderInterface } from "../types/orderInterface";

export class OrderEntity {
    private model: OrderModel;


    constructor(model: OrderModel) {
        this.model = model;
    }

    public async createOrder(order: orderInterface): Promise<orderInterface> {
        const newOrder: any = await this.model.create(order);
        return newOrder;
    }


    public async deleteOrder(orderId: string): Promise<void> {
        const order = await this.model.findById(orderId);
        if (!order) throw new Error("order not found");
        await this.model.findByIdAndDelete(orderId);
    }

    public async getOrderByCode(code: string): Promise<orderInterface | null> {
        const order: any = await this.model.findOne({ code: code });
        return order;
    }

    public async getOrderByConsolidationID(id: string): Promise<orderInterface[] | null> {
        const orders: any = await this.model.find({ consolidationID: id });
        return orders;
    }

    public async getOrderByTransactionID(id: string): Promise<orderInterface[] | null> {
        const orders: any = await this.model.find({ transactionID: id });
        return orders;
    }

    public async getOrderByDeliveryPersonID(id: string): Promise<orderInterface[] | null> {
        const orders: any = await this.model.find({ deliveryPersonID: id });
        return orders;
    }

    public async filterOrder(create_at: Date, sended_at: Date, transactionID: string, consolidationID: string): Promise<any> {

        const filter: any = {};

        if (create_at) {
            filter.create_at = create_at;
        }

        if (sended_at) {
            filter.sended_at = sended_at;
        }

        if (transactionID) {
            filter.transactionID = { $regex: new RegExp(transactionID, "i") };
        }

        if (consolidationID) {
            filter.consolidationID = { $regex: new RegExp(consolidationID, "i") };
        }

        const orders = await this.model.find(filter);
        return orders;
    }

    public async updateOrderStatus(orderId: string, updates: Partial<orderInterface>): Promise<orderInterface | null> {
        try {
            const order = await this.model.findById(orderId);

            if (!order) {
                // Order not found
                throw new Error("order not found");
                return null;
            }
            Object.assign(order, updates);

            // Save the updated order to the database
            const updatedOrder = await order.save();
            return updatedOrder.toObject(); // Convert Mongoose document to plain JavaScript object
        } catch (error) {
            // Handle errors, e.g., log them or throw a custom error
            console.error('Error updating order status:', error);
            throw error;
        }
    }

    public async getAllOrders(): Promise<orderInterface[]> {
        const allOrders: any = await this.model.find();
        return allOrders;
    }

}