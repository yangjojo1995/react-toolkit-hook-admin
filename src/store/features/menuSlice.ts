import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
export interface MenuState {
  value: Object;
}

const initialState: MenuState = {
  value: []
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenu: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    }
  }
});

export const { setMenu } = menuSlice.actions;
export const selectMenu = (state: RootState) => state.menu.value;

export default menuSlice.reducer;
