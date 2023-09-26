import { createSlice } from '@reduxjs/toolkit';

const initialTitlesState = {
  loading: false,
  title: null,
  titles: [],
};

const titlesSlice = createSlice({
  name: 'titles',
  initialState: initialTitlesState,
  reducers: {
    reset(state) {
      state.title = null;
      state.titles = [];
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setTitles(state, action) {
      state.titles = action.payload;
    },
    setTitle(state, action) {
      state.title = action.payload;
    },
  },
});
export default titlesSlice;
