import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { orderData } from "../../../axios/api/order/createOrder";
import { orderInterface } from "../../../../types/OrderInterface";

export const fetchOrderDetails = createAsyncThunk(
  "order/fetchOrder",
  async (code: string) => {
    if (code) {
      const response = await orderData(code);
      return response;
    }
  }
);

interface orderDetailsState {
  orderId: string | null;
  orderDetails: orderInterface | null;
  error: string | null;
  status: string;
}

const initialState: orderDetailsState = {
  orderId: null,
  orderDetails: null,
  error: null,
  status: "idle",
};

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    clearorderDetails: (state) => {
      state.orderDetails = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setorderId: (state, action: PayloadAction<string>) => {
      state.orderId = action.payload;
    },
    clearorderId: (state) => {
      state.orderId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export const { clearorderDetails, setError, setorderId, clearorderId } =
  orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;