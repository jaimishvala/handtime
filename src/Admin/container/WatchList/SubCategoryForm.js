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
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
        category_id: yup.string()
            .required("Please Select Any One Option"),
        sub_name: yup.string()
            .required("Please Enter SubCategory Name")
            .matches(/^[a-zA-Z]{2,30}$/, "Please Enter Valid Name"),
    });

    const { handleSubmit, handleBlur, handleChange, values, touched, errors, setValues } = useFormik({
        validationSchema: SubCategorySchema,
        initialValues: {
            category_id: '',
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
                Add SubCategory
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>SubCategory:</DialogTitle>
                <DialogContent className="px-5 pb-4">
                    <form className='row' style={{ width: '500px' }}>
                        <lebel>Category Name:</lebel>
                        <Select
                            name="category_id"
                            id="category_id"
                            className="form-select"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.category_id}
                            style={{ width: "120px", height: "30px" }}
                        >

                            <MenuItem value='0'>Select</MenuItem>
                            {
                                watchcat.watchcat.map((v) => {
                                    return (
                                        <MenuItem value={v.id}>{v.category_name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                        <br></br>
                        {errors.category_id && touched.category_id ? <span>{errors.category_id}</span> : null}

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
                    </form>

                </DialogContent>


                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>{updateData ? 'update' : 'add'}</Button>
                </DialogActions>

            </Dialog>
        </div >
    );
}

export default SubCategoryForm;