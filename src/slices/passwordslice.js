import { createSlice } from '@reduxjs/toolkit'

const passwordSlice = createSlice({
  name: 'password',
  initialState: '',
  reducers: {
    setPassword(state, action) {
      return action.payload;
    },
    clearPassword(state) {
      return '';
    },
  },
})

export const { setPassword, clearPassword } = passwordSlice.actions
export default passwordSlice.reducer
