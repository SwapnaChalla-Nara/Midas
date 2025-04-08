import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchResult {
  docId: string;
  source: string;
  aNumber: string;
  cNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  yob: string;
  mob: string;
  dob: string;
  countryOfBirth: string;
  poBirth: string;
  registeredState: string;
  fileNumber: string;
  poeText: string;
  yoe: string;
  lineNo: string;
  rowNo: string;
  format: string;
  calcdSoundex: string;
  soundex: string;
  folderName: string;
  access: boolean;
}

interface SearchState {
  results: SearchResult[];
  searchParams: Partial<SearchResult>;
  loading: boolean;
}

const initialState: SearchState = {
  results: [],
  searchParams: {},
  loading: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchParams: (state, action: PayloadAction<Partial<SearchResult>>) => {
      state.searchParams = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<SearchResult[]>) => {
      state.results = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    toggleAccess: (state, action: PayloadAction<string>) => {
      const result = state.results.find(r => r.docId === action.payload);
      if (result) {
        result.access = !result.access;
      }
    }
  },
});

export const { setSearchParams, setSearchResults, setLoading, toggleAccess } = searchSlice.actions;
export default searchSlice.reducer;