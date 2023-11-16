import { createSlice } from "@reduxjs/toolkit";

const initialStatus ={
    status:false,
    userData:null
}
const authSlicer = createSlice({
    name: "auth",
    initialStatus,
    reducers:{
          login: (state,action) => {
            state.status = true,
            state.userData = action.payload.userData
          },
          logout:(state)=>{
            state.status = false
          }
    }
})
export const {login,logout} = authSlicer.actions
export default authSlicer.reducer