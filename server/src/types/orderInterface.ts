import { Types } from "mongoose";
export interface orderInterface {
    _id?: Types.ObjectId,
    code?: string,

    senderName?: string,
    senderCountry?: string,
    senderCity?: string,
    senderDistrict?: string,
    senderVillage?: string,
    senderHouseNumber?: string,
    senderPhone?: string,

    receiverName?: string,
    receiverCountry?: string,
    receiverDistrict?: string,
    receiverVillage?: string,
    receiverHouseNumber?: string,
    receiverCity?: string,
    receiverPhone?: string,

    type: boolean,
    specialService?: string[],
    cannotDelivered?: string,

    items?: string[],
    
    estimatedTime: number,

    mainFee?: number,
    additionalFee?: number,
    GTGTFee?: number,
    VAT?: number,
    otherFee?: number,
    sumFee?: number,
    COD?: number,
    other?: number,
    sum?: number,
    weight?: number,
    cost?: number,
    note?: string,
    create_at?: Date,
    sended_at?: Date,
    status?: Array <Status>,
}

export interface Status {
    action?: string;
    fromConsolidation?: string;
    fromTransaction?: string;
    toConsolidation?: string;
    toTransaction?: string;
    date?: Date;
    staff?: string;
    place?: string;
    note?: string;
    guide?: string;
}