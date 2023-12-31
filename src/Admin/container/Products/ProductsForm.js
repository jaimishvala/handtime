import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect } from 'react';

function ProductsForm({ onHandleSubmit, updateData }) {
    const [open, setOpen] = React.useState(false);


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

    let date = new Date();
    let nd = new Date(date.setDate(date.getDate() - 1));

    const ProductSchema = yup.object().shape({
        name: yup.string()
            .required("Please Enter Name")
            .matches(/^[a-zA-Z]{2,30}$/, "Please Enter Valid Name"),
        price: yup.string()
            .required("Please Enter a Price")
            .matches(
                /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/,
                "Please Enter a Positive"
            ),

        date: yup.date()
            .min(nd, "Please Enter a valid Date")
            .required("Please Enter a Date"),
        message: yup.string()
            .min(10)
            .max(100)
            .required("Please Enter a Message")
    });

    const { handleSubmit, handleBlur, handleChange, values, touched, errors, setValues } = useFormik({
        validationSchema: ProductSchema,
        initialValues: {
            name: '',
            price: '',
            date: '',
            message: '',
        },
        onSubmit: (values, action) => {
            onHandleSubmit(values)

            action.resetForm()
            handleClose()
        },
    });


    return (
        <div>
            <h2>Products Example:</h2>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Products
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        // autoFocus
                        margin="dense"
                        name='name'
                        id="name"
                        label="Please enter name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                    />
                    {errors.name && touched.name ? <span>{errors.name}</span> : null}

                    <TextField
                        // autoFocus
                        margin="dense"
                        name='price'
                        id="price"
                        label="Please enter price"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.price}
                    />
                    {errors.price && touched.price ? <span>{errors.price}</span> : null}

                    <TextField
                        // autoFocus
                        margin="dense"
                        name='date'
                        id="date"
                        label="Please enter date"
                        type="date"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.date}
                    />
                    {errors.date && touched.date ? <span>{errors.date}</span> : null}

                    <TextField
                        // autoFocus
                        margin="dense"
                        name='message'
                        id="message"
                        label="Please enter message"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.message}
                    />
                    {errors.message && touched.message ? <span>{errors.message}</span> : null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>{updateData ? "Update" : "Add"}</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}

export default ProductsForm;