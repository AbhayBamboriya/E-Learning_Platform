import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../Helper/axiosInstance.js";


// initial state of auth slice
const initialState={
    isLoggedIn:localStorage.getItem('isLoggedIn')   || false,
    role:localStorage.getItem('role') || "",
    data:localStorage.getItem('data') || "",
    UserId:localStorage.getItem('UserId') || ""

}  

export const createAccount=createAsyncThunk('/auth/signup',async(data, { rejectWithValue }) => {
    try{
        console.log('data in slice0,',data);
        const res=await axiosInstance.post("/register",data)
        
        console.log('res'+await res);
        return (await res).data
    }
    catch(e){
        // toast.error(e?.response?.data?.message)
         toast.error(e?.response?.data?.message, {
            position: "top-right",
        });
    }
})




export const login=createAsyncThunk('/auth/login',async(data) =>{
    try{
        console.log('data is ,',data);
        const res=await axiosInstance.post("/login",data)
        console.log('res from login',res);
        
        return (await res).data
    }
    catch(e){
        // toast.error()
        toast.error(e?.response?.data?.message, {
            position: "top-right",
        });
    }
})



const authSlice=createSlice({
    name:'auth',
    // initialState,
    reducers:{},
})
export default authSlice.reducers