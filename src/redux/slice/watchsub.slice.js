import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { db } from "../../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";


const initialState = {
    isLoading: false,
    watchsubcat: [],
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

export const getWatchSubCat = createAsyncThunk(
    'watchsubcat/get',
    async () => {

        let data = []

        const querySnapshot = await getDocs(collection(db, "watchsubcat"));
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id })
            console.log(doc.id, " => ", doc.data());
        });

        return data;
    }
)


export const addWatchSubCat = createAsyncThunk(
    'watchsubcat/post',
    async (data) => {

        try {
            const docRef = await addDoc(collection(db, "watchsubcat"), data);
            console.log("Document written with ID: ", docRef.id);
            console.log(docRef);

            return { ...data, id: docRef.id }
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }
)

export const deleteWatchSubCat = createAsyncThunk(
    'watchsubcat/delete',
    async (id) => {

        await deleteDoc(doc(db, "watchsubcat", id));

        return id;
    }
)

export const updateWatchSubCat = createAsyncThunk(
    'watchsubcat/put',
    async (data) => {
        console.log(data);

        const washingtonRef = doc(db, "watchsubcat", data.id);

        let watchsubcatData = { ...data, id: data.id };
        delete watchsubcatData.id;

        await updateDoc(washingtonRef, watchsubcatData);

        return data;
    }
)

export const watchsubcatSlice = createSlice({
    name: 'watchsubcat',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        console.log(builder);

        builder.addCase(getWatchSubCat.pending, onLoading);

        builder.addCase(getWatchSubCat.fulfilled, (state, action) => {
            state.watchsubcat = action.payload;
            state.isLoading = false;
            state.error = null;
        })

        builder.addCase(getWatchSubCat.rejected, onError);

        builder.addCase(addWatchSubCat.fulfilled, (state, action) => {
            state.watchsubcat = state.watchsubcat.concat(action.payload)
        })

        builder.addCase(deleteWatchSubCat.fulfilled, (state, action) => {
            state.watchsubcat = state.watchsubcat.filter((v) => v.id !== action.payload)
        })

        builder.addCase(updateWatchSubCat.fulfilled, (state, action) => {
            state.watchsubcat = state.watchsubcat.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload;
                } else {
                    return v;
                }
            })
        })
    }

})


export default watchsubcatSlice.reducer;