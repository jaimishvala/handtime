import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementCart, deleteCart, incrementCart } from '../../redux/slice/cart.slice';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import * as yup from 'yup';
import { useEffect } from 'react';
import { getWatch } from '../../redux/slice/watch.slice';
import { useParams } from 'react-router-dom';


const validationSchema = yup.object().shape({
    name: yup.string().required().matches(/^[a-zA-Z]{2,30}$/, "Please Enter Valid Name"),
    address1: yup.string().required(),
    address2: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
    country: yup.string().required(),
    telephone: yup.number().required(),
    message: yup.string().required(),
    Name: yup.string().required(),
    card_number: yup.string().required(),
    expiry: yup.date().required(),
    cvv: yup.number().required()

});


function Cart(props) {
    const [step, setStep] = useState(1);


    const initialValues = {
        name: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        telephone: '',
        message: '',
        Name: '',
        card_number: '',
        expiry: '',
        cvv: ''
    };


    const handleNextStep = () => {
        if (step < 3) {
            setStep(step + 1);
        }
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const dispatch = useDispatch()

    const products = useSelector(state => state.products)
    console.log(products);

    const watch = useSelector(state => state.watch)
    console.log(watch.watch);

    const { id } = useParams()


    useEffect(() => {
        dispatch(getWatch())
    }, [id])

    const cart = useSelector(state => state.cart)
    console.log(cart);



    const cartData = cart.cart.map((v) => {
        let ped = watch.watch.find((p) => p.id === v.id)

        let fData = { ...ped, qty: v.qty }
        return fData
    })
    console.log(cartData);



    let total = cartData.reduce((acc, v) => acc + (v.price * v.qty), 0)
    console.log(total);


    let tax1 = 0, tax2 = 0, tax3 = 0, tax4 = 0, tax5 = 0, tax6 = 0;

    if (total >= 0 && total <= 300) {
        tax1 = 0;
    } else if (total > 300 && total <= 600) {
        tax1 = 0;
        tax2 = (total - 300) * 0.05;
    } else if (total > 600 && total <= 900) {
        tax1 = 0;
        tax2 = 300 * 0.05;
        tax3 = (total - 600) * 0.1;
    } else if (total > 900 && total <= 1200) {
        tax1 = 0;
        tax2 = 300 * 0.05;
        tax3 = 300 * 0.1;
        tax4 = (total - 900) * 0.15;
    } else if (total > 1200 && total <= 1500) {
        tax1 = 0;
        tax2 = 300 * 0.05;
        tax3 = 300 * 0.1;
        tax4 = 300 * 0.15;
        tax5 = (total - 1200) * 0.2;
    } else if (total > 1500) {
        tax1 = 0;
        tax2 = 300 * 0.05;
        tax3 = 300 * 0.1;
        tax4 = 300 * 0.15;
        tax5 = 300 * 0.2;
        tax6 = (total - 1500) * 0.3;
    }

    let Tax = tax1 + tax2 + tax3 + tax4 + tax5 + tax6;
    console.log(Tax);

    let FinalTotal = (total + Tax)
    console.log(FinalTotal);


    const handleDecrement = (id) => {

        dispatch(decrementCart(id))
    }

    const handleIncrement = (id) => {
        dispatch(incrementCart(id))
    }

    const handleDelete = (id) => {
        dispatch(deleteCart(id))
    }


    return (
        <div className='container'>
            <h4>ADD TO CART {step}</h4>

            <section className="h-100 h-custom">
                <div className="container h-100 py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">


                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={(values, actions) => {
                                    console.log(values, actions);
                                    // Simulate API call here (e.g., using setTimeout)
                                    setTimeout(() => {
                                        alert('Payment Submitted Successfully.');
                                        actions.setSubmitting(false);
                                    }, 1000);
                                }}
                            >
                                {({ isSubmitting, values, handleChange, handleSubmit, handleBlur, errors, touched }) => (
                                    <Form>
                                        <div>
                                            {step === 1 && (

                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" className="h5">Shopping Bag</th>
                                                                <th scope="col">Format</th>
                                                                <th scope="col">Quantity</th>
                                                                <th scope="col">Price</th>
                                                                <th scope='col'>Action</th>
                                                            </tr>
                                                        </thead>
                                                        {
                                                            cartData.map((v) => {
                                                                    return (
                                                                        <tbody>
                                                                            <tr>
                                                                                <th scope="row">
                                                                                    <div className="d-flex align-items-center">
                                                                                        <img src={v.file} className="img-fluid rounded-3" style={{ width: 200 }} alt="Book" />
                                                                                        <div className="flex-column ms-4">
                                                                                            <h4 className="mb-2">{v.name}</h4>
                                                                                            <span style={{ color: "black" }}>₹{v.price}</span>
                                                                                            <p className="mb-0" style={{ color: "black" }}>{v.desc}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </th>
                                                                                <td className="align-middle">
                                                                                    <p className="mb-0" style={{ fontWeight: 500 }}>Digital</p>
                                                                                </td>
                                                                                <td className="align-middle">
                                                                                    <div className="d-flex flex-row">
                                                                                        <button onClick={() => handleIncrement(v.id)}>+</button>
                                                                                        <span>{v.qty}</span>
                                                                                        <button onClick={() => handleDecrement(v.id)}>-</button>
                                                                                    </div>
                                                                                </td>
                                                                                <td className="align-middle">
                                                                                    <p className="mb-0" style={{ fontWeight: 500 }}>{v.price}</p>
                                                                                </td>

                                                                                <td className='align-middle'>
                                                                                    <DeleteIcon onClick={() => handleDelete(v.id)} />
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>

                                                                    )
                                                            })
                                                        }
                                                    </table>

                                                    <div className="d-flex justify-content-between" style={{ fontWeight: 500 }}>
                                                        <p className="mb-2" style={{ color: "black" }}>SubTotal:</p>
                                                        <p className="mb-2" style={{ color: "black" }}>${total}</p>
                                                    </div>
                                                    <div className="d-flex justify-content-between" style={{ fontWeight: 500 }}>
                                                        <p className="mb-0" style={{ color: "black" }}>Shipping Tax:</p>
                                                        <p className="mb-0" style={{ color: "black" }}>${Tax}</p>
                                                    </div>
                                                    <hr className="my-4" />
                                                    <div className="d-flex justify-content-between mb-4" style={{ fontWeight: 500 }}>
                                                        <p className="mb-2" style={{ color: "black" }}>Total (tax included):</p>
                                                        <p className="mb-2" style={{ color: "black" }}>${FinalTotal}</p>
                                                    </div>

                                                </div>

                                            )}

                                            {step === 2 && (
                                                <div className="container">
                                                    <div className="row mx-0 justify-content-center">
                                                        <div className="col-md-7 col-lg-5 px-lg-2 col-xl-4 px-xl-0 px-xxl-3">
                                                            <form className="w-100 rounded-1 p-4 border bg-white" action=''>
                                                                <label className="d-block mb-4">
                                                                    <span className="form-label d-block">Your name</span>
                                                                    <input
                                                                        name="name"
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Joe Bloggs"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.name}
                                                                    />
                                                                    <ErrorMessage name='name' />
                                                                </label>
                                                                <label className="d-block mb-4">
                                                                    <span className="form-label d-block">Address line 1</span>
                                                                    <input
                                                                        name="address1"
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.address1}
                                                                    />
                                                                    <ErrorMessage name='address1' />
                                                                </label>
                                                                <label className="d-block mb-4">
                                                                    <span className="form-label d-block">Address line 2</span>
                                                                    <input
                                                                        name="address2"
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.address2}
                                                                    />
                                                                    <ErrorMessage name='address2' />
                                                                </label>
                                                                <label className="d-block mb-4">
                                                                    <span className="form-label d-block">City</span>
                                                                    <input
                                                                        name="city"
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.city}
                                                                    />
                                                                    <ErrorMessage name='city' />
                                                                </label>
                                                                <label className="d-block mb-4">
                                                                    <span className="form-label d-block">State/Province</span>
                                                                    <input
                                                                        name="state"
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.state}
                                                                    />
                                                                    <ErrorMessage name='state' />
                                                                </label>
                                                                <label className="d-block mb-4">
                                                                    <span className="form-label d-block">Zip/Postal code</span>
                                                                    <input
                                                                        name="zip"
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.zip}
                                                                    />
                                                                    <ErrorMessage name='zip' />
                                                                </label>
                                                                <label className="d-block mb-4">
                                                                    <span className="form-label d-block">Country</span>
                                                                    <input
                                                                        name="country"
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.country}
                                                                    />
                                                                    <ErrorMessage name='country' />
                                                                </label>
                                                                <label className="d-block mb-4">
                                                                    <span className="form-label d-block">Telephone</span>
                                                                    <input
                                                                        name="telephone"
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.telephone}
                                                                    />
                                                                    <ErrorMessage name='telephone' />
                                                                </label>
                                                                <label className="d-block mb-4">
                                                                    <span className="form-label d-block">Delivery information</span>
                                                                    <textarea
                                                                        name="message"
                                                                        className="form-control"
                                                                        rows={3}
                                                                        placeholder="floor/door lock code/etc."
                                                                        defaultValue={""}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.message}
                                                                    />
                                                                    <ErrorMessage name='message' />
                                                                </label>
                                                                {/* <div className="mb-3">
                                                                <button type="submit" className="btn btn-primary px-3 rounded-3">
                                                                    Save
                                                                </button>
                                                            </div> */}
                                                                {/* <button type='submit'>Save</button> */}
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>


                                            )}

                                            {step === 3 && (
                                                <div className="card shadow-2-strong mb-5 mb-lg-0" style={{ borderRadius: 16 }}>
                                                    <div className="card-body p-4">
                                                        <div className="row">
                                                            <div className="col-md-6 col-lg-4 col-xl-3 mb-4 mb-md-0">
                                                                <form>
                                                                    <div className="d-flex flex-row pb-3">
                                                                        <div className="d-flex align-items-center pe-2">
                                                                            <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel1v" defaultValue aria-label="..." defaultChecked />
                                                                        </div>
                                                                        <div className="rounded border w-100 p-3">
                                                                            <p className="d-flex align-items-center mb-0">
                                                                                {/* <i className="fab fa-cc-mastercard fa-2x text-dark pe-2" /> */}
                                                                                <img src='../../assets/images/credit.jpg' style={{ width: "30px" }} />
                                                                                Credit Card
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex flex-row pb-3">
                                                                        <div className="d-flex align-items-center pe-2">
                                                                            <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel2v" defaultValue aria-label="..." />
                                                                        </div>
                                                                        <div className="rounded border w-100 p-3">
                                                                            <p className="d-flex align-items-center mb-0">
                                                                                {/* <i className="fab fa-cc-visa fa-2x fa-lg text-dark pe-2" /> */}
                                                                                <img src='../../assets/images/visa.jpg' style={{ width: "30px" }} />
                                                                                Debit Card
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex flex-row">
                                                                        <div className="d-flex align-items-center pe-2">
                                                                            <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel3v" defaultValue aria-label="..." />
                                                                        </div>
                                                                        <div className="rounded border w-100 p-3">
                                                                            <p className="d-flex align-items-center mb-0">
                                                                                {/* <i className="fab fa-cc-paypal fa-2x fa-lg text-dark pe-2" /> */}
                                                                                <img src='../../assets/images/paypal.png' style={{ width: "30px" }} />
                                                                                PayPal
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            <div className="col-md-6 col-lg-4 col-xl-6">
                                                                <div className="row">
                                                                    <div className="col-12 col-xl-6">
                                                                        <div className="form-outline mb-4 mb-xl-5">
                                                                            <label className="form-label" htmlFor="typeName">Name on card</label>
                                                                            <input
                                                                                type="text"
                                                                                name='Name'
                                                                                id="typeName"
                                                                                className="form-control form-control-lg" siez={17}
                                                                                placeholder="John Smith"
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}
                                                                                value={values.Name}
                                                                            />
                                                                            <ErrorMessage name='Name' />
                                                                        </div>
                                                                        <div className="form-outline mb-4 mb-xl-5">
                                                                            <label className="form-label" htmlFor="typeExp">Expiration</label>
                                                                            <input
                                                                                type="text"
                                                                                name='expiry'
                                                                                id="typeExp"
                                                                                className="form-control form-control-lg" placeholder="MM/YY"
                                                                                size={7}
                                                                                minLength={7}
                                                                                maxLength={7}
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}
                                                                                value={values.expiry}
                                                                            />
                                                                            <ErrorMessage name='expiry' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-xl-6">
                                                                        <div className="form-outline mb-4 mb-xl-5">
                                                                            <label className="form-label" htmlFor="typeText">Card Number</label>
                                                                            <input
                                                                                type="text"
                                                                                name='card_number'
                                                                                id="typeText"
                                                                                className="form-control form-control-lg" siez={17}
                                                                                placeholder="1111 2222 3333 4444"
                                                                                minLength={19}
                                                                                maxLength={19}
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}
                                                                                value={values.card_number}
                                                                            />
                                                                            <ErrorMessage name='card_number' />
                                                                        </div>
                                                                        <div className="form-outline mb-4 mb-xl-5">
                                                                            <label className="form-label" htmlFor="typeText">Cvv</label>
                                                                            <input
                                                                                type="password"
                                                                                name='cvv'
                                                                                id="typeText"
                                                                                className="form-control form-control-lg" placeholder="●●●"
                                                                                size={1}
                                                                                minLength={3}
                                                                                maxLength={3}
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}
                                                                                value={values.cvv}
                                                                            />
                                                                            <ErrorMessage name='cvv' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4 col-xl-3">
                                                                <div className="d-flex justify-content-between" style={{ fontWeight: 500 }}>
                                                                    <p className="mb-2" style={{ color: "black" }}>SubTotal:</p>
                                                                    <p className="mb-2" style={{ color: "black" }}>₹{total}</p>
                                                                </div>
                                                                <div className="d-flex justify-content-between" style={{ fontWeight: 500 }}>
                                                                    <p className="mb-0" style={{ color: "black" }}>Shipping Tax:</p>
                                                                    <p className="mb-0" style={{ color: "black" }}>₹{Tax}</p>
                                                                </div>
                                                                <hr className="my-4" />
                                                                <div className="d-flex justify-content-between mb-4" style={{ fontWeight: 500 }}>
                                                                    <p className="mb-2" style={{ color: "black" }}>Total (tax included):</p>
                                                                    <p className="mb-2" style={{ color: "black" }}>₹{FinalTotal}</p>
                                                                </div>
                                                                <>
                                                                    <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={isSubmitting}>
                                                                        Place Order
                                                                    </button>
                                                                </>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <div>
                                                {step > 1 && (
                                                    <button className='btn_cart_1' type="button" onClick={handlePreviousStep}>
                                                        Previous
                                                    </button>
                                                )}
                                                {step < 3 && (
                                                    <button
                                                        className='btn_cart_1'
                                                        type="button"
                                                        onClick={handleNextStep}
                                                        disabled={
                                                            (step === 1 &&
                                                                cartData.length === 0 ? true : false)
                                                            ||
                                                            (step === 2 && (!values.name || !values.address1 || !values.address2 || !values.city || !values.state || !values.zip || !values.country || !values.telephone || !values.message))
                                                        }
                                                    >
                                                        Next
                                                    </button>
                                                )}
                                                {/* {step === 3 && (
                                                    <button className='btn_cart_1' type="submit" disabled={isSubmitting}>
                                                        Submit
                                                    </button>
                                                )} */}
                                            </div>

                                        </div>
                                    </Form>
                                )}
                            </Formik>



                        </div>
                    </div>
                </div>
            </section >

        </div >

    );
}

export default Cart;