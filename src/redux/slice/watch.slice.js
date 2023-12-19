import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addWatchData, deleteWatchData, getWatchData, updateWatchData } from "../../common/api/watch.api"



const initialState = {
    isLoading: false,
    watch: [],
    error: null
}


export const getWatch = createAsyncThunk(
    'watch/get',
    async () => {
        let respones = await getWatchData();
        console.log(respones.data);

        return respones.data;
    }
)


export const addWatch = createAsyncThunk(
    'watch/post',
    async (data) => {
        await addWatchData(data);

        return data;
    }
)


export const deleteWatch = createAsyncThunk(
    'watch/delete',
    async (id) => {
        await deleteWatchData(id);

        return id;
    }
)


export const updateWatch = createAsyncThunk(
    'watch/put',
    async (data) => {
        await updateWatchData(data);

        return data;
    }
)


export const watchSlice = createSlice({
    name: 'watch',
    initialState: initialState,
    reducers: {},
    // getWatch: (state, action) => {
    //     state.watch = action.payload

    //     state.isLoading = false;
    //     state.watch = state.watch;
    //     state.error = null;
    // },

    // addWatch: (state, action) => {
    //     state.watch = state.watch.concat(action.payload)

    //     state.isLoading = false;
    //     state.watch = state.watch;
    //     state.error = null;
    // },


    extraReducers: (builder) => {
        console.log(builder);

        builder.addCase(getWatch.fulfilled, (state, action) => {
            console.log(action);
            state.watch = action.payload;
            state.isLoading = false;
            state.error = null;
        });

        builder.addCase(addWatch.fulfilled, (state, action) => {
            state.watch = state.watch.concat(action.payload)
        });

        builder.addCase(deleteWatch.fulfilled, (state, action) => {
            state.watch = state.watch.filter((v) => v.id !== action.payload)
        });

        builder.addCase(updateWatch.fulfilled, (state, action) => {
            state.watch = state.watch.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload;
                } else {
                    return v;
                }
            });
        });
    }
});

export default watchSlice.reducer;