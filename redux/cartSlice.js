import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    count: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.items.find((item) => item.bookTitle === action.payload.bookTitle);
      if (itemExists) {
        itemExists.quantity += action.payload.quantity
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity });
      }
      state.count = state.count + action.payload.quantity
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.bookTitle === action.payload.bookTitle);
      item.quantity++;
      state.count++;
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.bookTitle === action.payload.bookTitle);
      if (item.quantity === 1) {
        const index = state.items.findIndex((item) => item.bookTitle === action.payload.bookTitle);
        state.items.splice(index, 1);
      } else {
        item.quantity--;
      }
      state.count--;
    },
    removeFromCart: (state, action) => {
      const item = state.items.find((item) => item.bookTitle === action.payload.bookTitle)
      state.items = state.items.filter((item) => item.bookTitle !== action.payload.bookTitle);
      state.count -= item.quantity;
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const selectCartState = (state) => state.cart

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions;