import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";



const initialState = {
    isLoading: false,
    order: [],
    error: null
}

export const getOrder = createAsyncThunk(
    'order/get',
    async () => {

        let data = []

        const querySnapshot = await getDocs(collection(db, "order"));
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id })
            console.log(doc.id, " => ", doc.data());
        });

        return data;
    }
)


export const addOrder = createAsyncThunk(
    'order/post',
    async (data) => {

        try {
            const docRef = await addDoc(collection(db, "order"), data);
            console.log("Document written with ID: ", docRef.id);
            console.log(docRef);

            return { ...data, id: docRef.id }
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }
)

export const deleteOrder = createAsyncThunk(
    'order/delete',

    async (id) => {
        await deleteDoc(doc(db, 'order', id))

        return id;
    }
)

export const updateOrder = createAsyncThunk(
    'order/put',

    async (data) => {
        console.log(data);

        const washingtonRef = doc(db, "order", data.id);

        let orderData = { ...data, id: data.id };
        delete orderData.id;

        await updateDoc(washingtonRef, orderData);

        return data;
    }
)

export const orderSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {},

    extraReducers: (builder) => {
        console.log(builder);

        builder.addCase(getOrder.fulfilled, (state, action) => {
            state.order = action.payload;
        })

        builder.addCase(addOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.order = state.order.concat(action.payload);
            state.error = null;
        });

        builder.addCase(deleteOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.order = state.order.filter((v) => v.id !== action.payload);
            state.error = null;
        })

        builder.addCase(updateOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.order = state.order.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload;
                } else {
                    return v;
                }
            })
            state.error = null;
        })

    }
});

export default orderSlice.reducer;