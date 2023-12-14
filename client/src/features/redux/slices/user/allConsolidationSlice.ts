import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { allConsolidationsData } from "../../../axios/api/consolidation/consolidationPointDetails";

export const fetchAllConsolidations = createAsyncThunk("consolidations/fetchAll", async () => {
    try {
      const response = await allConsolidationsData();
      return response.allConsolidations;
    } catch (error) {
      throw Error("Error fetching consolidations");
    }
  });
  
  interface consolidationDetailsState {
    consolidations: any;
    error: string | null;
    status: string;
  }
  
  const initialState: consolidationDetailsState = {
    consolidations: null,
    error: null,
    status: "idle",
  };
  
  const consolidationsSlice = createSlice({
    name: "consolidations",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllConsolidations.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchAllConsolidations.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.consolidations = action.payload;
        })
        .addCase(fetchAllConsolidations.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message ?? null;
        });
    },
  });
  
  export default consolidationsSlice.reducer;
  