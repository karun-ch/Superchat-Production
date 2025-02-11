import { createSlice } from "@reduxjs/toolkit";

const chatbotSlice = createSlice({
    name:'chatbot',
    initialState:{
        chatbot:true,
        translate:false
    },
    reducers:{
        toggleChatbot:(state,action)=>{
            state.chatbot=action.payload
        },
        toggleTranslate:(state,action)=>{
            state.translate=action.payload
        }
    }
})

export const {toggleChatbot,toggleTranslate} = chatbotSlice.actions
export default chatbotSlice.reducer