import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
var contentful = require('contentful');

const initialState = {
  products: [],
  cartItems: JSON.parse(localStorage.getItem('products')) || [],
  filterButtons: [],
  favouriteItems: JSON.parse(localStorage.getItem('favourites')) || [],
  amount: 0,
  total: 0,
  isLoading: true,
};

// fetching data from contentful
const client = contentful.createClient({
  space: 'fkhe1sr2t377',
  accessToken: 'LP1rjwzW4itxZEUFuifnvyUBsZnimBDFXYkCSxXxx5E',
});

export const getProducts = createAsyncThunk('cart/getProducts', () => {
  return client
    .getEntries({
      content_type: 'productsData',
    })
    .then((response) => response)
    .catch(console.error);
});

// end of contenetful data fetching

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const itemId = action.payload;
      const cartProducts = state.products.find(
        (item) => itemId === item.sys.id
      );
      state.cartItems = [...state.cartItems, cartProducts];
    },
    filterItems: (state, { payload }) => {
      console.log(payload);
      let filterProducts = state.filterButtons.filter(
        (item) => item.fields.category === payload
      );
      if (payload === 'all') {
        return state.products;
      } else {
        state.products = filterProducts;
      }
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

    addToFavourites: (state, { payload }) => {
      let favouriteProducts = state.products.find((item) => {
        return payload === item.sys.id;
      });
      state.favouriteItems = [...state.favouriteItems, favouriteProducts];
    },

    removeFromFavourites: (state, { payload }) => {
      state.favouriteItems = state.favouriteItems.filter(
        (item) => item.sys.id !== payload
      );
    },
    saveToLocalStorage: (state) => {
      localStorage.setItem('products', JSON.stringify(state.cartItems));
      localStorage.setItem('favourites', JSON.stringify(state.favouriteItems));
    },
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      const { items } = action.payload;
      state.products = items;
      state.filterButtons = items;
      state.isLoading = false;
    },
    [getProducts.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  addItemToCart,
  filterItems,
  clearCart,
  removeItem,
  increaseQty,
  decreaseQty,
  cartTotalItems,
  saveToLocalStorage,
  getItemsFromStorage,
  addToFavourites,
  removeFromFavourites,
} = cartSlice.actions;
export default cartSlice.reducer;
