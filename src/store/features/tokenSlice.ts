import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
export interface TokenState {
  value: string
}

const initialState: TokenState = {
  value: localStorage.getItem('token')||''
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      localStorage.setItem('token',action.payload)
    }
  }
});

export const { setToken } = tokenSlice.actions;
export const selectToken = (state: RootState) => state.token.value;

export default tokenSlice.reducer;
