import { configureStore } from "@reduxjs/toolkit";

// import authSlice from "./AuthSlice";
import authSlice from "./AuthSlice.js";

const store=configureStore({
    reducer:{
        auth:authSlice,
        // quiz:QuizSlice
    },
   
})

export default store