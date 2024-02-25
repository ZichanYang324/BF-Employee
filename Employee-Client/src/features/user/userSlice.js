import API_PATHS from "../../globals/paths";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
} from "../../utils/localStorage";
import { loginUserThunk, registerUserThunk } from "./userThunk";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  //   isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

// action creator
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk(API_PATHS.USER_REGISTER, user, thunkAPI);
  },
);

// action creator
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk(API_PATHS.USER_LOGIN, user, thunkAPI);
  },
);

// export const updateUser = createAsyncThunk(
//   'user/updateUser',
//   async (userObj, thunkAPI) => {
//     return updateUserThunk(API_PATHS.USER_UPDATE, userObj.userId, userObj.user, thunkAPI);
//   }
// );

const storeUser = (tokenValue, expirationTime) => {
  const expiredTimeDays = Math.fround(expirationTime / (3600 * 24));
  Cookies.set("token", tokenValue, { expires: expiredTimeDays });
};

// const removeCookies = () => {
//   Cookies.remove('token');
// };

// export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk);

// reducer
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // toggleSidebar: (state) => {
    //   state.isSidebarOpen = !state.isSidebarOpen;
    // },
    // logoutUser: (state, { payload }) => {
    //   state.user = null;
    //   state.isSidebarOpen = false;
    //   delete customFetch.defaults.headers.common.Authorization;
    //   removeUserFromLocalStorage();
    //   removeCookies();
    //   if (payload) {
    //     toast.success(payload);
    //   }
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user, token, expiresIn } = payload;
        state.isLoading = false;
        state.user = user;
        storeUser(token, expiresIn);
        if (user) {
          addUserToLocalStorage(user);
        }

        toast.success(`Login successfully`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user, token, expiresIn } = payload;
        state.isLoading = false;
        state.user = user;
        storeUser(token, expiresIn);
        addUserToLocalStorage(user);

        toast.success(`Welcome Back ${user.username}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
    //   .addCase(updateUser.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(updateUser.fulfilled, (state, { payload }) => {
    //     const { user } = payload;
    //     state.isLoading = false;
    //     state.user = user;
    //     addUserToLocalStorage(user);

    //     toast.success(`User Updated!`);
    //   })
    //   .addCase(updateUser.rejected, (state, { payload }) => {
    //     state.isLoading = false;
    //     toast.error(payload);
    //   })
    //   .addCase(clearStore.rejected, () => {
    //     toast.error('There was an error..');
    //   });
  },
});

// export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
