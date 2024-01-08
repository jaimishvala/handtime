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


function WatchCatForm({ onHandleSubmit, updateData }) {
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


    const WatchcatSchema = yup.object().shape({
        category_name: yup.string()
            .required("Please Enter Category Name")
            .matches(/^[a-zA-Z]{2,30}$/, "Please Enter Valid Category Name"),
    });

    const { handleSubmit, handleBlur, handleChange, values, touched, errors, setValues } = useFormik({
        validationSchema: WatchcatSchema,
        initialValues: {
            category_name: '',
        },
        onSubmit: (values, action) => {
            console.log(values);
            onHandleSubmit(values)

            action.resetForm()
            handleClose()
        },
    });

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Category
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Category:</DialogTitle>
                <DialogContent className="px-5 pb-4">
                    <form className='row' style={{ width: '500px' }}>
                        <TextField
                            margin="dense"
                            id="category_name"
                            name='category_name'
                            label="Enter Category Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.category_name}
                        />

                        {errors.category_name && touched.category_name ? <span>{errors.category_name}</span> : null}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>{updateData ? 'update' : 'add'}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default WatchCatForm;