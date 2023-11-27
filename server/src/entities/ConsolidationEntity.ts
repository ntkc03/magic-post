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
        const consolidation = await this.model.findById({ id });
        return consolidation;
    }
}