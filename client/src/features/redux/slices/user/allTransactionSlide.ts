import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { allTransactionsData } from "../../../axios/api/transaction/transactionPointDetails";

export const fetchAllTransactions = createAsyncThunk("transactions/fetchAll", async () => {
    try {
      const response = await allTransactionsData();
      return response.allConsolidations;
    } catch (error) {
      throw Error("Error fetching transactions");
    }
  });
  
  interface transactionDetailsState {
    transactions: any;
    error: string | null;
    status: string;
  }
  
  const initialState: transactionDetailsState = {
    transactions: null,
    error: null,
    status: "idle",
  };
  
  const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllTransactions.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchAllTransactions.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.transactions = action.payload;
        })
        .addCase(fetchAllTransactions.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message ?? null;
        });
    },
  });
  
  export default transactionsSlice.reducer;
  