import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import userReducer from "./features/userSlice";

const persistConfig = {
  //takes all variables from reducers and saves them to local storage
  key: "root",
  storage,
  blacklist: ["user"], //ignored reducers
};

const userPersistConfig = {
  //config which variables will be ignored by persist in a specific reducer
  key: "user",
  storage,
  blacklist: ["user", "users"],
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
