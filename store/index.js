"use client";
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
      const user = state.users.find((user) => user.email === state.currentUser.email);
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
    },
  },
});

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
  return result;
};

const loadStateFromLocalStorage = () => {
  const serializedState = localStorage.getItem("reduxState");
  if (serializedState === null) {
    return undefined; 
  }
  return JSON.parse(serializedState);
};


const store = configureStore({
  reducer: {
    crud: crudSlice.reducer,
  },
  preloadedState: loadStateFromLocalStorage(), 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export const crudActions = crudSlice.actions;
export default store;
