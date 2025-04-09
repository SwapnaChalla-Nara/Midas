import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  results: Array<{
    docId: string;
    source: string;
    aNumber: string;
    cNumber: string;
    folderName: string;
    access: boolean;
  }>;
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  results: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    startSearch(state) {
      state.loading = true;
      state.error = null;
    },
    searchSuccess(state, action: PayloadAction<SearchState['results']>) {
      state.loading = false;
      state.results = action.payload;
    },
    searchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    toggleAccess(state, action: PayloadAction<string>) {
      state.results = state.results.map((result) =>
        result.docId === action.payload
          ? { ...result, access: !result.access }
          : result
      );
    },
  },
});

export const { startSearch, searchSuccess, searchFailure, toggleAccess } = searchSlice.actions;
export default searchSlice.reducer;