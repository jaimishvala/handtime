import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addWatchData, deleteWatchData, getWatchData, updateWatchData } from "../../common/api/watch.api"
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";



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

        let data = [];

        const querySnapshot = await getDocs(collection(db, "product"));
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id })
            console.log(`${doc.id} => ${doc.data()}`);
        });
        console.log(data);

        return data;

    }
)


export const addWatch = createAsyncThunk(
    'watch/post',
    async (data) => {
        console.log(data);

        let proData = { ...data }
        console.log(proData);

        let rNo = Math.floor(Math.random() * 10000)

        const storageRef = ref(storage, 'product/' + rNo + '_' + data.file.name);

        await uploadBytes(storageRef, data.file).then(async (snapshot) => {
            console.log('Uploaded a blob or file!');
            await getDownloadURL(snapshot.ref)
                .then(async (url) => {
                    console.log(url);
                    let proDoc = await addDoc(collection(db, "product"), { ...data, file: url, file_name: rNo + '_' + data.file.name })
                    console.log(proDoc);
                    proData = { id: proDoc.id, ...data, file: url, file_name: rNo + '_' + data.file.name }
                })
        })
            .catch((error) => console.log(error));

        console.log(proData);
        return proData;
    }
)


export const deleteWatch = createAsyncThunk(
    'watch/delete',
    async (data) => {
        const proRef = ref(storage, 'product/' + data.file_name);
        console.log(proRef);

        await deleteObject(proRef).then(async () => {
            await deleteDoc(doc(db, "product/", data.id));
            console.log("Delete Image Successfully.");
        }).catch((error) => {
            console.log("Image Not Delete Successfully.");
            console.log(error);
        });

        return data.id;
    }
)


export const updateWatch = createAsyncThunk(
    'watch/put',
    async (data) => {
        console.log(data);

        let proData = { ...data }
        console.log(proData);

        if (typeof data.file === "string") {
            const proRef = doc(db, "product", data.id);
            await updateDoc(proRef, { ...data, id: data.id });
        } else {

            const proRef = ref(storage, 'product/' + data.file_name);
            console.log(proRef);

            await deleteObject(proRef).then(async () => {
                let rNo = Math.floor(Math.random() * 10000)

                const storageRef = ref(storage, 'product/' + rNo + '_' + data.file.name);
                console.log(storageRef);

                await uploadBytes(storageRef, data.file).then(async (snapshot) => {
                    console.log('Uploaded a blob or file!');
                    await getDownloadURL(snapshot.ref)
                        .then(async (url) => {
                            console.log("URL", url);

                            const washingtonRef = doc(db, "product", data.id);

                            let newdata = { ...data, file: url, file_name: rNo + '_' + data.file.name }

                            delete newdata.id;

                            await updateDoc(washingtonRef, newdata);

                            proData = { ...data, file: url, file_name: rNo + '_' + data.file.name }

                        })

                })
                    .catch((error) => console.log(error));
            }).catch((error) => {
                console.log(error);
            });

        }

        console.log(proData);
        return proData;
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
            state.isLoading = false;
            state.watch = state.watch.concat(action.payload)
            state.error = null;
        });

        builder.addCase(deleteWatch.fulfilled, (state, action) => {
            state.isLoading = false;
            state.watch = state.watch.filter((v) => v.id !== action.payload)
            state.error = null;
        });

        builder.addCase(updateWatch.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
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