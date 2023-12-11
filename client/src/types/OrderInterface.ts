export interface orderInterface {
    _id?: any,
    code?: string,

    senderName?: string,
    senderAddress?: string,
    senderCountry?: string,
    senderCity?: string,
    senderDistrict?: string,
    senderVillage?: string,
    senderHouseNumber?: string,
    senderPhone?: string,

    receiverName?: string,
    receiverAddress?: string,
    receiverCountry?: string,
    receiverDistrict?: string,
    receiverVillage?: string,
    receiverHouseNumber?: string,
    receiverCity?: string,
    receiverPhone?: string,

    type: boolean,
    specialService?: string[],
    cannotDelivered?: string,

    items?:string[],


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
    status?: string[],
    consolidationID?: string,
    transactionID?: string,
    deliveryPersonID?: string
}
