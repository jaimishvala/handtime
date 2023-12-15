import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

function Auth(props) {
    const [type, setType] = useState("login")

    let authObj, iniVal;

    if (type === 'login') {
        authObj = {
            email: yup.string().email().required(),
            password: yup.string().required()
        }

        iniVal = {
            email: '',
            password: ''
        }
    } else if (type === 'signup') {
        authObj = {
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required(),
            con_password: yup.string().required().test("con_password", "Not Same Password", function (value) {
                // console.log(v);
                if (value == this.parent.password) {
                    return true;
                } else {
                    return false;
                }
            })
        }

        iniVal = {
            name: '',
            email: '',
            password: '',
            con_password: ''
        }
    } else {
        authObj = {
            email: yup.string().email().required(),
        }

        iniVal = {
            email: ''
        }
    }


    let AuthSchema = yup.object().shape(authObj);

    const formikObj = useFormik({

        initialValues: iniVal,

        onSubmit: values => {
            console.log(values)
        },

        enableReinitialize: true,
        validationSchema: AuthSchema
    });

    const { handleSubmit, handleChange, handleBlur, values, errors, touched } = formikObj
    console.log(errors);
    return (
        <div>
            <section id="user" className="userId">
                <div className="container">
                    <div className="section-title">
                        {
                            type === 'login' ? <h2>Login</h2> :
                                type === 'signup' ? <h2>Signup</h2> :
                                    <h2>Forget Pasword</h2>
                        }

                    </div>

                    <form onSubmit={handleSubmit} role="form" className="php-email-form">
                        <div className="row justify-content-center">
                            {
                                type === 'signup' ?
                                    <div className="col-md-8 form-group">
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            id="name"
                                            placeholder="Your Name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                        // TextError={errors.name && touched.name ? <span>{errors.name}</span> : ''}
                                        />
                                        {errors.name && touched.name ? <span>{errors.name}</span> : null}
                                    </div>
                                    :
                                    null
                            }

                            <div className="col-md-8 form-group mt-3 mt-md-0">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    placeholder="Your Email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                // TextError={errors.email && touched.email ? <span>{errors.email}</span> : ''}
                                />
                                {errors.email && touched.email ? <span>{errors.email}</span> : null}
                            </div>


                            {

                                type === 'login' || type === 'signup' ?
                                    <div className="col-md-8 form-group mt-3 mt-md-0">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            id="password"
                                            placeholder="Your password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                        // TextError={errors.password && touched.password ? <span>{errors.password}</span> : ''}
                                        />
                                        {errors.password && touched.password ? <span>{errors.password}</span> : null}
                                    </div>
                                    : null

                            }

                            {

                                type === 'signup' ?
                                    <div className="col-md-8 form-group mt-3 mt-md-0">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="con_password"
                                            id="con_password"
                                            placeholder="Your Confirmed password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.con_password}
                                        // TextError={errors.con_password && touched.con_password ? <span>{errors.con_password}</span> : ''}
                                        />
                                        {errors.con_password && touched.con_password ? <span>{errors.con_password}</span> : null}
                                    </div>
                                    : null

                            }

                        </div>

                        <div class="text-center">
                            {
                                type === 'login' ? <button className='btn' type="submit">Login</button> :
                                    type === 'signup' ? <button className='btn' btnType="Secondary" type="submit">SignUp</button> :
                                        <button className='btn' btnType="Outline" type="submit">Submit</button>
                            }
                        </div>
                    </form>

                    {
                        type === 'login' ? <span>Created An Acount <a className='btnA' onClick={() => setType('signup')}>Signup</a></span> :
                            <span>Alredy Have An Acount <a className='btnA' onClick={() => setType('login')}>Login</a></span>
                    }
                    <br></br><br></br>
                    {
                        type === 'login' ? <span>Forget Password<a className='btnA' onClick={() => setType('forgot')}>Forget Pasword</a></span> :
                            null
                    }


                </div>
            </section>
        </div>
    );
}

export default Auth;