import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
export interface GlobalState {
  value: string,
  isCollapse:boolean
}

const initialState: GlobalState = {
  value: '',
  isCollapse:false
};

export const GlobalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setCollapse: (state, action: PayloadAction<boolean>) => {
      state.isCollapse = action.payload;
    }
  }
});

export const { setCollapse } = GlobalSlice.actions;
export const getValue = (state: RootState) => state.global.value;
export const getCollapse = (state: RootState) => state.global.isCollapse;

export default GlobalSlice.reducer;
