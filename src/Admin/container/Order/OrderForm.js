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
import { useState } from 'react';

function OrderForm({ onHandleSubmit, updateData }) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()


    useEffect(() => {
        if (updateData) {
            handleClickOpen()
            setValues(updateData)
        }
    }, [updateData])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    let Watchschema = yup.object().shape({
        total_amount: yup.string().required(),
        address2: yup.string().required()
    })

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue, setValues } = useFormik({
        validationSchema: Watchschema,
        initialValues: {
            total_amount: '',
            address2: ''
        },
        onSubmit: (values, action) => {
            onHandleSubmit(values)
            action.resetForm()
            handleClose()
        },
    });

    return (
        <div>
            <h2>Product:</h2>
            <Button variant="outlined" onClick={handleClickOpen}>
                ADD Order
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Product:</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="total_amount"
                        name='total_amount'
                        label="Enter Total Amount"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.total_amount}
                    />
                    {errors.total_amount && touched.total_amount ? <span>{errors.total_amount}</span> : null}

                    <TextField
                        margin="dense"
                        id="address"
                        name='address'
                        label="Enter Address"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address2}
                    />
                    {errors.address2 && touched.address2 ? <span>{errors.address2}</span> : null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>{updateData ? "Update" : "Add"}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default OrderForm;