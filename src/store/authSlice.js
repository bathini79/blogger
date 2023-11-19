import { createSlice } from "@reduxjs/toolkit";

const initialStatus ={
    status:false,
    userData:null
}
const authSlicer = createSlice({
  name: "auth",
  initialState: initialStatus,
  reducers: {
      login: (state, action) => {
          return {
              ...state,
              status: true,
              userData: action?.payload?.userData
          };
      },
      logout: (state) => {
          return {
              ...state,
              status: false
          };
      }
  }
});

export const {login,logout} = authSlicer.actions
export default authSlicer.reducer