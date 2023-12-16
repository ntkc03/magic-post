export interface TransactionInterface {
    map(arg0: (transactionRow: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    _id?: any,
    address?: string,
    consolidation?: string,
    manager?: string,
    quantity?: number
}