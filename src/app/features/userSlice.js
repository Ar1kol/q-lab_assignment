import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { getUsers } from "./userAPI";

const initialState = {
  users: [],
  user: null,
  deletedUsers: [],
  updatedUsers: [],
  rows: 10,
};

export const getUsersAsync = createAsyncThunk("user/getUsers", async (rows) => {
  const response = await getUsers(rows);
  return response.data.results;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeRowsAmount: (state, action) => {
      state.rows = action.payload;
    },
    updateUser: (state, action) => {
      let foundIndex = state.updatedUsers.findIndex(
        (user) => user.userId === action.payload.userId
      );
      if (foundIndex !== -1) {
        state.updatedUsers[foundIndex] = action.payload;
      } else {
        state.updatedUsers.push(action.payload);
      }
    },
    deleteUser: (state, action) => {
      state.deletedUsers.push(action.payload);
      console.log(current(state.users));
      console.log(action.payload);
      state.users = state.users.filter(
        (user) => user.login.uuid !== action.payload
      );
      console.log(state.users);
    },
    getUser: (state, action) => {
      state.user = state.users.find(
        (user) => user.login.uuid === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload;
        if (state.deletedUsers.length > 0) {
          state.users = state.users.filter(
            (user) => state.deletedUsers.includes(user.login.uuid) !== true
          );
        }
        if (state.updatedUsers.length > 0) {
          state.updatedUsers.forEach((updated) => {
            const userIndex = state.users.findIndex(
              (user) => user.login.uuid === updated.userId
            );
            if (userIndex !== -1) {
              state.users[userIndex].name.first = updated.firstName;
              state.users[userIndex].name.last = updated.lastName;
              state.users[userIndex].email = updated.email;
              state.users[userIndex].phone = updated.phone;
            }
          });
        }
      });
  },
});

export const { changeRowsAmount, updateUser, deleteUser, getUser } =
  userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectRows = (state) => state.user.rows;
export const selectUsers = (state) => state.user.users;
export const selectDeletedUsers = (state) => state.user.deletedUsers;

export default userSlice.reducer;
