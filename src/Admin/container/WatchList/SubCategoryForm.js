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
        dispatch(getWatchCat())
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const SubCategorySchema = yup.object().shape({
        name: yup.string()
            .required("Please Enter Name")
            .matches(/^[a-zA-Z]{2,30}$/, "Please Enter Valid Name"),
    });

    const { handleSubmit, handleBlur, handleChange, values, touched, errors, setValues } = useFormik({
        validationSchema: SubCategorySchema,
        initialValues: {
            name: '',
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


                    <select>
                        <option>--Select--</option>
                        <option></option>
                    </select>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="sub_name"
                        name='sub_name'
                        label="Enter SubName"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SubCategoryForm;