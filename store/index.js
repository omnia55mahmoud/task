"use client";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const crudSlice = createSlice({
  name: "crud",
  initialState: {
    products: [],
    showUpdateForm: false,
  },

  reducers: {
    addProduct(state, action) {
      state.products.push(action.payload);
    },
    editProduct(state, action) {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct(state, action) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    displayUpdateForm(state) {
      state.showUpdateForm = true;
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
