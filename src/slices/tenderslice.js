import { createSlice } from '@reduxjs/toolkit';

const tenderSlice = createSlice({
  name: 'tender',
  initialState: {
    tenderId: null,
  },
  reducers: {
    setTenderId(state, action) {
      state.tenderId = action.payload;
    },
    clearTenderId(state) {
      state.tenderId = '';
    },
  },
});

export const { setTenderId, clearTenderId } = tenderSlice.actions;
export default tenderSlice.reducer;
