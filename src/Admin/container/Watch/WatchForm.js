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
        category_name: yup.string()
            .required("Please Enter Category Name"),
        sub_name: yup.string()
            .required("Please Enter SubCategory Name"),
        name: yup.string()
            .required("Please Enter Name")
            .matches(/^[a-zA-Z]{2,30}$/, "Please Enter Valid Name"),
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

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, setValues } = useFormik({
        validationSchema: Watchschema,
        initialValues: {
            category_name: '',
            sub_name: '',
            name: '',
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

        const fData = watchsubcat.watchsubcat.filter((v) => v.category_name === value);

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
                <DialogTitle>Product</DialogTitle>
                <DialogContent>
                        <lebel>Category Name:</lebel>
                        <select
                            name="category_name"
                            id="category_name"
                            className="form-select"
                            onChange={(e) => { handleChange(e); handleSub(e.target.value) }}
                            onBlur={handleBlur}
                            value={values.category_name}
                        >

                            <option value='0'>Select</option>
                            {
                                watchcat.watchcat.map((v) => (
                                    <option key={v.id} value={v.id}>
                                        {v.category_name}
                                    </option>
                                ))
                            }

                        </select>
                        {errors.category_name && touched.category_name ? <span>{errors.category_name}</span> : null}

                        <br></br><br></br>
                        <lebel>SubCategory Name:</lebel>
                        <select
                            name="sub_name"
                            id="sub_name"
                            className="form-select"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.sub_name}
                        >

                            <option value='0'>Select</option>
                            {
                                subcategory.map((v) => (
                                    <option key={v.id} value={v.sub_name}>
                                        {v.sub_name}
                                    </option>
                                ))
                            }

                        </select>
                        {errors.sub_name && touched.sub_name ? <span>{errors.sub_name}</span> : null}

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