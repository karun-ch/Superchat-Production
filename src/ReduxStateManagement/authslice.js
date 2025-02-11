import { createSlice } from "@reduxjs/toolkit";

const authslice=createSlice({
    name: "auth",
    initialState:{
        token:null
    },
    reducers:{
        login:(state,action)=>{
            state.token=action.payload.token
            localStorage.setItem("token",action.payload.token)
        },
        logout:(state)=>{
            state.token=null
            localStorage.removeItem("token")
        }
    }
})

export const {login,logout}=authslice.actions

export default authslice.reducer