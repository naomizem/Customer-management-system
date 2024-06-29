import { createSlice } from "@reduxjs/toolkit";
 
const messageSlice = createSlice({
    initialState: {
        message: null,
    },
    name: 'message',
    reducers: {
        addMessage: (state, action) => {
            state.message = action.payload;
        },
        clearMessage: (state) => {
            state.message = null;
        }
    }
})

export default messageSlice.reducer;
export const { addMessage, clearMessage } = messageSlice.actions;
