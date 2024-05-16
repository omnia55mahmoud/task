"use client";
import UpdateProduct from "@/components/productForm/updateProduct";
import { createSlice, configureStore, current } from "@reduxjs/toolkit";

const crudSlice = createSlice({
  name: "crud",
  initialState: {
    users: [],
    showUpdateForm: false,
    isAuthorized: false,
    currentUser: null,
    editProduct: null,
  },
  reducers: {
    addProduct(state, action) {
      const user = state.users.find(
        (user) => user.email === state.currentUser.email
      );
      if (user) {
        user.products.push(action.payload);
        state.currentUser = { ...user };
      }
    },
    editProduct(state, action) {
      const product = state.currentUser.products.find(
        (product) => product.id === action.payload.id
      );
      state.editProduct = product;
    },
    updateProduct(state, action) {
      const user = state.users.find(
        (user) => user.email === state.currentUser.email
      );
      if (user) {
        const productIndex = user.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (productIndex !== -1) {
          user.products[productIndex] = action.payload;
          state.currentUser = { ...user };
          state.editProduct = null;
        }
      }
    },
    deleteProduct(state, action) {
      const user = users.find((user) => user.email === state.currentUser.email);
      if (user) {
        user.products = user.products.filter(
          (product) => product.id !== action.payload.id
        );
        state.currentUser = { ...user };
      }
    },
    userRegister(state, action) {
      state.users.push(action.payload);
    },
    userLogin(state, action) {
      state.isAuthorized = true;
      state.currentUser =
        state.users.find((user) => user.email === action.payload.email) || null;
    },

    userLogout(state) {
      state.isAuthorized = false;
      state.currentUser = null;
    },
  },
});

// Define your localStorage middleware
const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
  return result;
};

// Create a function to load initial state from localStorage
const loadStateFromLocalStorage = () => {
  const serializedState = localStorage.getItem("reduxState");
  if (serializedState === null) {
    return undefined; // If no state is found, return undefined
  }
  return JSON.parse(serializedState);
};

// Create the store with initial state loaded from localStorage if available
const store = configureStore({
  reducer: {
    crud: crudSlice.reducer,
  },
  preloadedState: loadStateFromLocalStorage(), // Load initial state from localStorage
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export const crudActions = crudSlice.actions;
export default store;
