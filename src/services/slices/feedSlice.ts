import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, TFeedsResponse } from '@api';

export const fetchOrders = createAsyncThunk<TFeedsResponse, void>(
  'feedSlice/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      return await getFeedsApi();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

type TFeedState = {
  feeds: TFeedsResponse | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: TFeedState = {
  feeds: null,
  status: 'idle',
  error: null
};

export const feedSlice = createSlice({
  name: 'feedSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.feeds = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch ingredients';
      });
  }
});
