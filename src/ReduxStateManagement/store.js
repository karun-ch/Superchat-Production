import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authslice"
import TokenExpirationMiddleware from "./tokenExpirationMiddleware";
import userReducer from "./user"
import chatbotReducer from './chatbot'
 
const store=configureStore({
    reducer:{
        auth:authReducer,
        user:userReducer,
        bot:chatbotReducer
        },
        middleware:(getDefaultMiddleware)=>
            getDefaultMiddleware().concat(TokenExpirationMiddleware)
})

export default store