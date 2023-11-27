import { Types } from "mongoose";

export interface orderInterface {
    _id?: Types.ObjectId,
    code?: string,

    senderName?: string,
    senderAddress?: string,
    senderLocal?: string,
    senderCity?: string,
    senderCountry?: string,
    senderPhone?: string,

    receiverName?: string,
    receiverAddress?: string,
    receiverLocal?: string,
    receiverCity?: string,
    receiverCountry?: string,
    receiverPhone?: string,

    type: boolean,
    specialService?: string,
    cannotDilvered?: number,

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
    transWeight?: number,

    note?: string,
    create_at?: Date,
    sended_at?: Date,
    status?: number,
    consolidationID?: string,
    transactionID?: string,
    deliveryPersonID?: string
}