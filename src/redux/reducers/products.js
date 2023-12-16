import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get_product_by_category } from '../../Services/Appservices';
const initialState = {
	products: [],
	loading: false,
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		getProductsLoading: (state, action) => {
			void (state.loading = true);
		},
		getProductsSuccess: (state, action) => {
			void ((state.loading = false), (state.products = action.payload));
		},

		getFilterProductsByCategory: (state, action) => {
			void (state.loading = false);
			get_product_by_category(action.payload).then(res => {
                [{...state.products ,res}];
            });
		},
	},
});

export const {
	getProductsLoading,
	getProductsSuccess,
	getFilterProductsByCategory,
} = productsSlice.actions;

export default productsSlice.reducer;
