import { EmployerModel } from "../frameworks/database/mongoDb/models/employerModel";
import { employerInterface } from "../types/employerInterface";

export class EmployerEntity {
    private model: EmployerModel;

    constructor(model: EmployerModel) {
        this.model = model;
    }
    //search
    public async getEmployerByUsername(username: string): Promise<employerInterface | null> {
        const user = await this.model.findOne({ username: username });
        return user;
    }

    public async getEmployerById(id: string): Promise<employerInterface | null> {
        const userData: any = await this.model.findById(id);
        return userData;
    }

    public async getEmployerByTransationID(transactionID: string): Promise<employerInterface[] | null> {
        const users: any = await this.model.find({ transactionID: transactionID });
        return users;
    }

    public async getEmployerByConsolidationID(consolidationID: string): Promise<employerInterface[] | null> {
        const users: any = await this.model.find({ consolidationID: consolidationID });
        return users;
    }


    //create
    public async createEmployer(employer: employerInterface): Promise<employerInterface> {
        const newEmployer = await this.model.create(employer);
        return newEmployer;
    }

    //delete
    public async deleteEmployer(username: string): Promise<void> {
        const employer = await this.model.findOne({ username: username });
        if (!employer) throw new Error("employer not found");
        await this.model.findOneAndDelete({ username: username });
    }

    public async deleteEmployerById(employerId: string): Promise<void> {
        const employer = await this.model.findById(employerId);
        if (!employer) throw new Error("employer not found");
        await this.model.findByIdAndDelete(employerId);
    }

}