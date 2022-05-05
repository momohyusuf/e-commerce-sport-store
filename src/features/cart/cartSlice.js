import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  cartItems: JSON.parse(localStorage.getItem('products')),
  amount: 0,
  total: 0,
  isLoading: true,
};

export const getProducts = createAsyncThunk('cart/getProducts', () => {
  return fetch('products.json')
    .then((response) => response.json())
    .catch((error) => console.log(error));
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const itemId = action.payload;
      const cartProducts = state.products.items.find(
        (item) => itemId === item.sys.id
      );
      state.cartItems = [...state.cartItems, cartProducts];
    },
    clearCart: (state) => {
      state.cartItems = [];
    },

    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.sys.id !== action.payload
      );
    },

    increaseQty: (state, { payload }) => {
      state.cartItems.find((item) => {
        if (item.sys.id === payload) {
          return item.fields.amount++;
        }
      });
    },

    decreaseQty: (state, { payload }) => {
      state.cartItems.find((item) => {
        if (item.sys.id === payload) {
          return item.fields.amount--;
        }
      });
    },

    cartTotalItems: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.fields.amount;
        total += item.fields.amount * item.fields.price;
      });
      state.amount = amount;
      state.total = total;
    },

    saveToLocalStorage: (state) => {
      localStorage.setItem('products', JSON.stringify(state.cartItems));
    },
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    [getProducts.rejected]: (state) => {
      state.isLoading = true;
    },
  },
});

export const {
  addItemToCart,
  clearCart,
  removeItem,
  increaseQty,
  decreaseQty,
  cartTotalItems,
  saveToLocalStorage,
  getItemsFromStorage,
} = cartSlice.actions;
export default cartSlice.reducer;
