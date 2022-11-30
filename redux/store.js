import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './cartSlice';
import { createWrapper } from 'next-redux-wrapper'
const reducer = {
  cart: cartReducer,
};

const makeStore = () => {
    const store = configureStore({
        reducer,
        devTools: true,
    }
    );
    return store;
}

// export default store;
export const wrapper = createWrapper(makeStore)