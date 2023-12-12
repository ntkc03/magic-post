import configKeys from "./config";

const apiConfig = {
    consolidationAddress: `${configKeys.API_URL}consolidation/consolidation-data/address`,
    getConsolidation: `${configKeys.API_URL}consolidation/consolidation-data/cons-id`,
    allConsolidations: `${configKeys.API_URL}consolidation/all-consolidations`,

    employerUsername: `${configKeys.API_URL}employer/employer-data/username`,
    getEmployer: `${configKeys.API_URL}employer/employer-data/emp-id`,
    employerTransId: `${configKeys.API_URL}employer/employer-data/transaction-id`,
    employerConsId: `${configKeys.API_URL}employer/employer-data/consolidation-id`,
    allEmployers: `${configKeys.API_URL}employer/all-employers`,
    deleteEmployer: `${configKeys.API_URL}employer/delete-employer`,
    deleteEmployerId: `${configKeys.API_URL}employer/delete-employer/:id`,

    createAccount: `${configKeys.API_URL}employer-auth/create`,
    login: `${configKeys.API_URL}employer-auth/login`,

    createOrder: `${configKeys.API_URL}order/create`,
    deleteOrder: `${configKeys.API_URL}order/delete`,
    orderCode: `${configKeys.API_URL}order/find-order`,
    orderConsId: `${configKeys.API_URL}order/find-order/consolidation-id`,
    orderTransId: `${configKeys.API_URL}order/find-order/transaction-id`,
    orderDeliverPersonId: `${configKeys.API_URL}order/find-order/deliveryPerson-id`,
    allOrders: `${configKeys.API_URL}order/all-orders`,
    filterOrder: `${configKeys.API_URL}order/filter-orders`,
    updaterOrder: `${configKeys.API_URL}order/update-order`,

    transactionAddress: `${configKeys.API_URL}transaction/transaction-data/address`,
    transactionConsId: `${configKeys.API_URL}transaction/transaction-data/consolidation-id`,
    getTransaction: `${configKeys.API_URL}transaction/transaction-data/:id`,
    allTransactions: `${configKeys.API_URL}transaction/all-transactions`,

}

export default apiConfig;