import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

function Contact(props) {


    let ContactSchema = yup.object().shape({
        name: yup.string()
            .required("Please Enter Name")
            .matches(/^[a-zA-Z ]{2,30}$/, "Please Enter Valid Name"),
        email: yup.string()
            .email("Please Enter Valid Email")
            .required("Please Enter Email"),
        phone: yup.number()
            .required("Please Enter Phone Number")
            .positive(),
        message: yup.string()
            .required("Please Enter Messge")
            .min(2, "Minimum 30 Character Valid")
            .max(100, "Maximum 100 Charecter Allowed")
    });


    const { handleSubmit, handleBlur, handleChange, touched, errors, values } = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            message: ''
        },
        onSubmit: values => {
            console.log(values);
        },
        validationSchema: ContactSchema
    });



    return (
        <div>
            <section className="contact_section layout_padding">
                <div className="container">
                    <div className="heading_container">
                        <h2>
                            Contact Us
                        </h2>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form_container">
                                <form action onSubmit={handleSubmit}>
                                    <div>
                                        <input
                                            name="name"
                                            type="text"
                                            placeholder="Your Name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                        />
                                        {errors.name && touched.name ? <span className='error'>{errors.name}</span> : null}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="phone"
                                            placeholder="Phone Number"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.phone}
                                        />
                                        {errors.phone && touched.phone ? <span className='error'>{errors.phone}</span> : null}
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                        />
                                        {errors.email && touched.email ? <span className='error'>{errors.email}</span> : null}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="message"
                                            className="message-box"
                                            placeholder="Message"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.message}
                                        />
                                        {errors.message && touched.message ? <span className='error'>{errors.message}</span> : null}
                                    </div>
                                    <div className="btn_box">
                                        <button>
                                            SEND
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-6 ">
                            <div className="map_container">
                                <div className="map">
                                    <div id="googleMap" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default Contact;