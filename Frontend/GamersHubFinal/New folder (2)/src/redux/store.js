import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/userSlice";
import GameSlice from "./slices/gameSlice";

const store = configureStore({
  reducer: {
    user: UserSlice,
    game: GameSlice,
  },
});

export default store;
