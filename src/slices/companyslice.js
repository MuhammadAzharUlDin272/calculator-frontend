import { createSlice } from '@reduxjs/toolkit';

const companySlice = createSlice({
  name: 'company',
  initialState: {
    companyId: null,
  },
  reducers: {
    setCompanyId(state, action) {
      state.companyId = action.payload;
    },
    clearCompanyId(state) {
      state.companyId = '';
    },
  },
});

export const { setCompanyId, clearCompanyId } = companySlice.actions;
export default companySlice.reducer;
