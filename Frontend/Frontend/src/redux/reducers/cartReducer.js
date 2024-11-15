import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        listCart: []
    },
    reducers: {
        addCarts(state, action) {
            state.listCart = [...state.listCart, ...action.payload]
        }
    }
})

export const { addCarts } = cartSlice.actions;
export default cartSlice.reducer;