import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	cart_pdt: [],
	show_cart: false,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		showCart: (state, action) => {
			void (state.show_cart = true);
		},
		closeCart: (state, action) => {
			void (state.show_cart = false);
		},

		addToCart: (state, action) => {
			state.cart_pdt.push(action.payload);
			state.quantity;
			state.total_amount += action.payload.price;
		},

		increaseQuantity: (state, action) => {
			void (action.payload += 1);
		},
		decreaseQuantity: (state, action) => {
			if (state.quantity > 0) {
				void (action.payload -= 1);
			} else {
				void action.payload;
			}
		},
		removeFromCart: (state, action) => {
			state.cart_pdt = state.cart_pdt.filter(
				(item) => item.id !== action.payload
			);
		},
		resetCart: (state, action) => {
			void(state.cart_pdt = []);
		},
	},
});

export const {
	addToCart,
	showCart,
	closeCart,
	resetCart,
	removeFromCart,
	decreaseQuantity,
	increaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
