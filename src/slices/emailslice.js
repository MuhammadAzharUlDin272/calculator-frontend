import { createSlice } from '@reduxjs/toolkit'

const emailSlice = createSlice({
  name: 'email',
  initialState: '',
  reducers: {
    setEmail(state, action) {
      return action.payload;
    },
    clearEmail(state) {
      return '';
    },
  },
})

export const { setEmail, clearEmail } = emailSlice.actions
export default emailSlice.reducer
