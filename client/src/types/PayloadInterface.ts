import { ConsolidationInterface } from "./ConsolidationInterface";
import { TransactionInterface } from "./TransactionInterface";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface SignupPayload extends LoginPayload {
  name: string;
  phone: string;
  confirmPassword: string;
}

export interface StatisticsPointsPayload{
  consolidation: ConsolidationInterface,
  transactions: TransactionInterface[]
}

export interface FilterPayload{
  consolidation: ConsolidationInterface,
  transaction: TransactionInterface
}