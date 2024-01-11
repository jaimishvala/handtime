import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getWatchCat } from '../../../redux/slice/watchcat.slice';
import { getWatchSubCat } from '../../../redux/slice/watchsub.slice';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function WatchForm({ onHandleSubmit, updateData }) {
    const [open, setOpen] = React.useState(false);
    const [category, setCategory] = useState([])
    const [subcategory, setSubCategory] = useState([])

    const dispatch = useDispatch()

    const watchcat = useSelector(state => state.watchcat)
    console.log(watchcat);

    const watchsubcat = useSelector(state => state.watchsubcat)
    console.log(watchsubcat);

    useEffect(() => {
        if (updateData) {
            handleClickOpen()
            setValues(updateData)
        }
        dispatch(getWatchCat())
        dispatch(getWatchSubCat())
    }, [updateData])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    let Watchschema = yup.object().shape({
        category_id: yup.string()
            .required("Please Enter Category Name"),
        sub_id: yup.string()
            .required("Please Enter SubCategory Name"),
        name: yup.string()
            .required("Please Enter Name")
            .matches(/^[a-zA-Z]{2,30}$/, "Please Enter Valid Name"),
        file: yup.mixed()
            .required("Please Enter File"),
        price: yup.string()
            .required("Please Enter a Price")
            .matches(
                /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/,
                "Please Enter a Positive"
            ),
        desc: yup.string()
            .required("Please Enter a Description")
            .matches(
                /^(.|\s)*[a-zA-Z]+(.|\s)*$/, "Please Enter a Description"),
    })

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue, setValues } = useFormik({
        validationSchema: Watchschema,
        initialValues: {
            category_id: '',
            sub_id: '',
            name: '',
            file: '',
            price: '',
            desc: '',
        },
        onSubmit: (values, action) => {
            onHandleSubmit(values)
            action.resetForm()
            handleClose()
        },
    });


    const handleSub = (value) => {
        console.log(value);
        setCategory(value)

        const fData = watchsubcat.watchsubcat.filter((v) => v.category_id === value);

        console.log(fData);

        setSubCategory(fData);
    }


    console.log(subcategory);
    console.log(category);
    console.log(values);
    return (
        <div>
            <h2>Product:</h2>
            <Button variant="outlined" onClick={handleClickOpen}>
                ADD Product
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Product:</DialogTitle>
                <DialogContent>
                    <lebel>Category Name:</lebel>
                    <Select
                        name="category_id"
                        id="category_id"
                        className="form-select"
                        onChange={(e) => { handleChange(e); handleSub(e.target.value) }}
                        onBlur={handleBlur}
                        value={values.category_id}
                        style={{ width: "120px", height: "30px" }}
                    >

                        <MenuItem value='0'>Select</MenuItem>
                        {
                            watchcat.watchcat.map((v) => (
                                <MenuItem key={v.id} value={v.id}>
                                    {v.category_name}
                                </MenuItem>
                            ))
                        }

                    </Select>
                    {errors.category_id && touched.category_id ? <span>{errors.category_id}</span> : null}

                    <br></br><br></br>
                    <lebel>SubCategory Name:</lebel>
                    <Select
                        name="sub_id"
                        id="sub_id"
                        className="form-select"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.sub_name}
                        style={{ width: "120px", height: "30px" }}
                    >

                        <MenuItem value='0'>Select</MenuItem>
                        {
                            subcategory.map((v) => (
                                <MenuItem key={v.id} value={v.id}>
                                    {v.sub_name}
                                </MenuItem>
                            ))
                        }

                    </Select>
                    {errors.sub_id && touched.sub_id ? <span>{errors.sub_id}</span> : null}

                    <TextField
                        margin="dense"
                        id="name"
                        name='name'
                        label="Enter Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                    />
                    {errors.name && touched.name ? <span>{errors.name}</span> : null}

                    <TextField
                        name='file'
                        type="file"
                        fullWidth
                        variant="standard"
                        onChange={(event) => setFieldValue("file", event.target.files[0])}
                    />
                    {/* {errors.file && touched.file ? <span>{errors.file}</span> : null} */}
                    <img
                        src={typeof values.file === "string" ? values.file : URL.createObjectURL(values.file)}
                        width={"50px"}
                        height={"50px"}
                    />
                    <TextField
                        margin="dense"
                        id="price"
                        name='price'
                        label="Enter price"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.price}
                    />
                    {errors.price && touched.price ? <span>{errors.price}</span> : null}

                    <TextField
                        margin="dense"
                        id="desc"
                        name='desc'
                        label="Enter desc"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.desc}
                    />
                    {errors.desc && touched.desc ? <span>{errors.desc}</span> : null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>{updateData ? "Update" : "Add"}</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default WatchForm;