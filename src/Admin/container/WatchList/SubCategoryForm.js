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
import { getWatchCat } from '../../../redux/slice/watchcat.slice';
import { useDispatch, useSelector } from 'react-redux';

function SubCategoryForm({ onHandleSubmit, updateData }) {
    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch()

    const watchcat = useSelector(state => state.watchcat)
    console.log(watchcat);

    useEffect(() => {
        if (updateData) {
            handleClickOpen()
            setValues(updateData)
        }
        dispatch(getWatchCat())
    }, [updateData])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const SubCategorySchema = yup.object().shape({
        category_name: yup.string()
            .required("Please Select Any One Option"),
        sub_name: yup.string()
            .required("Please Enter SubCategory Name")
            .matches(/^[a-zA-Z]{2,30}$/, "Please Enter Valid Name"),
    });

    const { handleSubmit, handleBlur, handleChange, values, touched, errors, setValues } = useFormik({
        validationSchema: SubCategorySchema,
        initialValues: {
            category_name: '',
            sub_name: '',
        },
        onSubmit: (values, action) => {
            console.log(values);
            onHandleSubmit(values)

            action.resetForm()
            handleClose()
        },
    });


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>

                    <select
                        name="category_name"
                        id="category_name"
                        className="form-select"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.category_name}
                    >

                        <option value='category_name'>Select</option>
                        {
                            watchcat.watchcat.map((v) => {
                                return (
                                    <option>{v.category_name}</option>
                                )
                            })
                        }

                    </select>
                    <br></br>
                    {errors.category_name && touched.category_name ? <span>{errors.category_name}</span> : null}

                    <TextField
                        margin="dense"
                        id="sub_name"
                        name='sub_name'
                        label="Enter Sub Category Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.sub_name}
                    />
                    {errors.sub_name && touched.sub_name ? <span>{errors.sub_name}</span> : null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>{updateData ? 'update' : 'add'}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SubCategoryForm;