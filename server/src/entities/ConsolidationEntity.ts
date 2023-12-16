import { ConsolidationModel } from "../frameworks/database/mongoDb/models/consolidationModel";
import { consolidationInterface } from "../types/consolidationInterface";

export class ConsolidationEntity {
    private model: ConsolidationModel;

    constructor(model: ConsolidationModel) {
        this.model = model;
    }

    public async getConsolidationByAddress(address: string): Promise<consolidationInterface | null> {
        const consolidation = await this.model.findOne({ address: address });
        return consolidation;
    }

    public async getConsolidationByID(id: string): Promise<consolidationInterface | null> {
        const consolidation = await this.model.findById(id);
        return consolidation;
    }

    public async getAllConsolidations(): Promise<consolidationInterface[]> {
        const allConsolidations = await this.model.find();
        return allConsolidations;
    }

    public async updateConsolidation(consolidationID: string, updates: Partial<consolidationInterface>): Promise<consolidationInterface | null> {
        try {
            const consolidation = await this.model.findById(consolidationID);

            if (!consolidation) {
                // Order not found
                throw new Error("consolidation not found");
                return null;
            }
            Object.assign(consolidation, updates);

            // Save the updated order to the database
            const updatedConsolidation = await consolidation.save();
            return updatedConsolidation.toObject(); // Convert Mongoose document to plain JavaScript object
        } catch (error) {
            // Handle errors, e.g., log them or throw a custom error
            console.error('Error updating order status:', error);
            throw error;
        }
    }
}