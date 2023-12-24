import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addWatchCatData, deleteWatchCatData, getWatchCatData, updateWatchCatData } from "../../common/api/watchcat.api"



const initialState = {
    isLoading: false,
    watchcat: [],
    error: null
}

const onLoading = (state, action) => {
    console.log(action);
    state.isLoading = false;
    state.error = null;
}

const onError = (state, action) => {
    console.log(action);
    state.isLoading = false;
    state.error = action.error.message;
}

export const getWatchCat = createAsyncThunk(
    'watchcat/get',
    async () => {
        let respones = await getWatchCatData()
        console.log(respones.data);

        return respones.data;
    }
)

export const addWatchCat = createAsyncThunk(
    'watchcat/post',
    async (data) => {
        console.log(data);
        await addWatchCatData(data)

        return data;
    }
)

export const deleteWatchCat = createAsyncThunk(
    'watchcat/delete',
    async (id) => {
        await deleteWatchCatData(id);

        return id;
    }
)

export const updateWatchCat = createAsyncThunk(
    'watchcat/put',
    async (data) => {
        await updateWatchCatData(data)

        return data;
    }
)

export const watchcatSlice = createSlice({
    name: 'watchcat',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        console.log(builder);

        builder.addCase(getWatchCat.pending, onLoading);

        builder.addCase(getWatchCat.fulfilled, (state, action) => {
            state.watchcat = action.payload;
        })

        builder.addCase(getWatchCat.rejected, onError);

        builder.addCase(addWatchCat.fulfilled, (state, action) => {
            state.watchcat = state.watchcat.concat(action.payload)
        })

        builder.addCase(deleteWatchCat.fulfilled, (state, action) => {
            state.watchcat = state.watchcat.filter((v) => v.id !== action.payload)
        })

        builder.addCase(updateWatchCat.fulfilled, (state, action) => {
            state.watchcat = state.watchcat.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload;
                } else {
                    return v;
                }
            })
        })
    }

})


export default watchcatSlice.reducer;