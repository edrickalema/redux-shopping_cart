import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	featuredProducts: [],
	loading: false,
};

const featuredProductsSlice = createSlice({
	name: 'featured_products',
	initialState,
	reducers: {
		getFeaturedLoadings: (state, action) => {
			void(state.loading = true);
		},
		getFeaturedProductsSuccess: (state, action) => {
			void (
            state.loading = false,
			state.featuredProducts = action.payload
            )
		}
	},
});

export const {
	getFeaturedLoadings,
	getFeaturedProductsSuccess,
} = featuredProductsSlice.actions;

export default featuredProductsSlice.reducer;
