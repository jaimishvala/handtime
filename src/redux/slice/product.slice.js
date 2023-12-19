import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addProductsData, deleteProductsData, getProductsData, updateProductsData } from "../../common/api/products.api"

const initialState = {
    isLoading: false,
    products: [],
    error: null
}


export const getProduct = createAsyncThunk(
    'products/get',
    async () => {
        let response = await getProductsData();
        console.log(response.data);
        return response.data;
    }
)

export const addProduct = createAsyncThunk(
    'products/post',
    async (data) => {
        await addProductsData(data);

        return data;
    }
)

export const deleteProduct = createAsyncThunk(
    'products/delete',
    async (id) => {
        await deleteProductsData(id)
        return id;
    }
)

export const updateProduct = createAsyncThunk(
    'products/put',
    async (data) => {
        await updateProductsData(data)
        return data;
    }
)


export const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        console.log(builder);
        //getProduct:
        builder.addCase(getProduct.fulfilled, (state, action) => {
            console.log(action);
            state.products = action.payload;
        });
        //addProduct:
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.products = state.products.concat(action.payload);
        })
        //deleteProduct:
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.products = state.products.filter((v) => v.id !== action.payload);
        })

        //updateProduct:
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.products = state.products.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload
                } else {
                    return v;
                }
            })
        })
    }
})


export default productsSlice.reducer;