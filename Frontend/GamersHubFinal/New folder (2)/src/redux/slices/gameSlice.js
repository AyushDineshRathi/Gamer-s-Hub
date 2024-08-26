import { createSlice } from "@reduxjs/toolkit";

const GameSlice = createSlice({
  name: "game",
  initialState: {
    game: null,
  },
  reducers: {
    setGames: (state, action) => {
      state.game = action.payload;
    },
  },
});

export const { setGames } = GameSlice.actions;

export default GameSlice.reducer;
