import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/app/lib/definitions';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: 'dark'
    },
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        }
    }
});


export const selectTheme = (state: RootState) => state.theme.theme;
export const getCurrentTheme = (state: RootState) => selectTheme(state);
export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
