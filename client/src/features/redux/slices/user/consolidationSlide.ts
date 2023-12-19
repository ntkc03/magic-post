import { createAsyncThunk } from "@reduxjs/toolkit";
import { orderData } from "../../../axios/api/order/createOrder";
import { getConsolidationByAddress } from "../../../axios/api/consolidation/consolidationPointDetails";

export const fetchConsolidation = createAsyncThunk(
    "order/fetchConsolidation",
    async (code: string) => {
      if (code) {
        const response = await getConsolidationByAddress(code);
        return response;
      }
    }
  );