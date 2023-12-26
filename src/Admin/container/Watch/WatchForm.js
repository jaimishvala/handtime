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

function WatchForm({ onHandleSubmit, updateData }) {
    const [open, setOpen] = React.useState(false);
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
        // console.log("handleClickOpen");
    };

    const handleClose = () => {
        setOpen(false);
    };


    let Watchschema = yup.object().shape({
        category_name: yup.string()
            .required("Please Enter Category Name")
            .matches(/^[a-zA-Z]{2,30}$/, "Please Enter Valid Category Name"),
        sub_name: yup.string()
            .required("Please Enter SubCategory Name")
            .matches(/^[a-zA-Z]{2,30}$/, "Please Enter Valid Name"),
        name: yup.string()
            .required("Please Enter Name")
            .matches(/^[a-zA-Z]{2,30}$/, "Please Enter Valid Name"),
        desc: yup.string()
            .required("Please Enter a Description")
            .matches(
                /^(.|\s)*[a-zA-Z]+(.|\s)*$/, "Please Enter a Description"),
        // .test("desc", "Please Enter More Than 20 Word Allowed", function (value) {
        //     // console.log(value);
        //     if (value <= 20) {
        //         return true;
        //     }
        // }),
        designation: yup.string()
            .required("Please Enter a Designation")
            .matches(/^[a-z ,.'-]+$/, "Please Enter Valid Designation"),
        profile_url: yup.string()
            .required("Please Enter a Profile URL")
            .matches(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/, "Please Enter https And WWW")
    })

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, setValues } = useFormik({
        validationSchema: Watchschema,
        initialValues: {
            category_name: '',
            sub_name: '',
            name: '',
            desc: '',
            designation: '',
            profile_url: '',
        },
        onSubmit: (values, action) => {
            // console.log(values);

            onHandleSubmit(values)
            // if (update) {
            //     handleUpdateData(values)
            // } else {
            //     handleAdd(values)
            // }
            // handleAdd(values)
            action.resetForm()
            handleClose()
        },

    });

    return (
        <div>
            <h2>Watch:</h2>
            <Button variant="outlined" onClick={handleClickOpen}>
                ADD Watch
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Doctor</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please Enter a Doctor Data When You are Enter a Data Please Mark
                        Some Thing Please Enter Appropriate Name,Description, Designation and
                        Profile URL.
                    </DialogContentText>
                    <lebel>Category Name:</lebel>
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

                        <option value='sub_name'>Select</option>
                        {
                            watchsubcat.watchsubcat.map((v) => {
                                return (
                                    <option>{v.sub_name}</option>
                                )
                            })
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

                    <TextField
                        margin="dense"
                        id="designation"
                        type="text"
                        name='designation'
                        label="Enter Designation"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.designation}
                    />
                    {errors.designation && touched.designation ? <span>{errors.designation}</span> : null}


                    <TextField
                        margin="profile_url"
                        id="profile_url"
                        name='profile_url'
                        label="Enter Fb Profile URL"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.profile_url}
                    />
                    {errors.profile_url && touched.profile_url ? <span>{errors.profile_url}</span> : null}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>{updateData ? "Update" : "Add"}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default WatchForm;