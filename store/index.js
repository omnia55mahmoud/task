import { createSlice,configureStore } from "@reduxjs/toolkit";

const crudSlice=createSlice({
    name:"crud",
    initialState:{
        products: [],
        showUpdateForm:false
    },
    reducers:{
        addProduct(state,action){
          state.products.push(action.payload)
        },
        editProduct(state,action){
            const index = state.products.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }

        },
        deleteProduct(state,action){
            state.products.filter((product=>product.id !== action.payload))
        },
        displayUpdateForm(state){
           state.showUpdateForm=true
        }
    }
    
})
const store=configureStore({
    reducer:{
        crud:crudSlice.reducer
    }
})
export const crudActions = crudSlice.actions;
export default store;