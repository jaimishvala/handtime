import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addWatchData, deleteWatchData, getWatchData, updateWatchData } from "../../common/api/watch.api"
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";



const initialState = {
    isLoading: false,
    watch: [],
    error: null
}

const onLoading = (state, action) => {
    console.log(action);
    state.isLoading = true;
    state.error = null;
}

const onError = (state, action) => {
    console.log(action);
    state.isLoading = false;
    state.error = action.error.message;
}

export const getWatch = createAsyncThunk(
    'watch/get',
    async () => {
        await new Promise((resolve, reject) => setTimeout(resolve, 2000))

        let data = [];

        const querySnapshot = await getDocs(collection(db, "product"));
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id })
            console.log(`${doc.id} => ${doc.data()}`);
        });
        console.log(data);

        return data;

        // let respones = await getWatchData();
        // console.log(respones.data);
        // return respones.data;
    }
)


export const addWatch = createAsyncThunk(
    'watch/post',
    async (data) => {
        console.log(data);

        try {
            const docRef = await addDoc(collection(db, "product"), data);
            console.log("Document written with ID: ", docRef.id);
            return { ...data, id: docRef.id }
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        // await addWatchData(data);
        // return data;
    }
)


export const deleteWatch = createAsyncThunk(
    'watch/delete',
    async (id) => {
        await deleteDoc(doc(db, "product", id));

        // await deleteWatchData(id);
        return id;
    }
)


export const updateWatch = createAsyncThunk(
    'watch/put',
    async (data) => {

        const washingtonRef = doc(db, "product", data.id);
        let watchData = { ...data, id: data.id }

        delete watchData.id;
        // Set the "capital" field of the city 'DC'
        await updateDoc(washingtonRef, watchData)

        // await updateWatchData(data);
        return data;
    }
)


export const watchSlice = createSlice({
    name: 'watch',
    initialState: initialState,
    reducers: {},

    extraReducers: (builder) => {
        console.log(builder);

        builder.addCase(getWatch.pending, onLoading);

        builder.addCase(getWatch.fulfilled, (state, action) => {
            console.log(action);
            state.watch = action.payload;
            state.isLoading = false;
            state.error = null;
        });

        builder.addCase(getWatch.rejected, onError);

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