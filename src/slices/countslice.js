import { createSlice } from '@reduxjs/toolkit';

const countSlice = createSlice({
  name: 'count',
  initialState: {
    count: 1
  },
  reducers: {
    setCount(state, action) {
      state.count = action.payload;
    },
    resetCount(state) {
      state.count = 1; // Reset to default start step
    },
    decrementCount(state) {
      state.count = Math.max(1, state.count - 1); // Decrement count but not below 1
    },
  },
});

export const {setCount, resetCount,decrementCount } = countSlice.actions;
export default countSlice.reducer;
