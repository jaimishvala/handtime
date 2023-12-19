import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementCart, deleteCart, incrementCart } from '../../redux/slice/cart.slice';
import DeleteIcon from '@mui/icons-material/Delete';

import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import 'font-awesome/css/font-awesome.min.css';



function Cart(props) {

    const {
        wrapperProps,
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps
    } = usePaymentInputs();


    const dispatch = useDispatch()

    const products = useSelector(state => state.products)
    console.log(products);

    const cart = useSelector(state => state.cart)
    console.log(cart);



    const cartData = cart.cart.map((v) => {
        let ped = products.products.find((p) => p.id === v.id)

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
            <h4>ADD TO CART</h4>


            <section className="h-100 h-custom">
                <div className="container h-100 py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">

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
                                                                <img src="https://www.mastersintime.com/pictures/timex-iq-intelligent-quartz-twg013600-11784217.jpg" className="img-fluid rounded-3" style={{ width: 200 }} alt="Book" />
                                                                <div className="flex-column ms-4">
                                                                    <h4 className="mb-2">{v.name}</h4>
                                                                    <span>{v.date}</span>
                                                                    <p className="mb-0">{v.message}</p>
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
                            </div>

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
                                                        <input type="text" id="typeName" className="form-control form-control-lg" siez={17} placeholder="John Smith" />
                                                        <label className="form-label" htmlFor="typeName">Name on card</label>
                                                    </div>
                                                    <div className="form-outline mb-4 mb-xl-5">
                                                        <input type="text" id="typeExp" className="form-control form-control-lg" placeholder="MM/YY" size={7} minLength={7} maxLength={7} />
                                                        <label className="form-label" htmlFor="typeExp">Expiration</label>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-xl-6">
                                                    <div className="form-outline mb-4 mb-xl-5">
                                                        <input type="text" id="typeText" className="form-control form-control-lg" siez={17} placeholder="1111 2222 3333 4444" minLength={19} maxLength={19} />
                                                        <label className="form-label" htmlFor="typeText">Card Number</label>
                                                    </div>
                                                    <div className="form-outline mb-4 mb-xl-5">
                                                        <input type="password" id="typeText" className="form-control form-control-lg" placeholder="●●●" size={1} minLength={3} maxLength={3} />
                                                        <label className="form-label" htmlFor="typeText">Cvv</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-xl-3">
                                            <div className="d-flex justify-content-between" style={{ fontWeight: 500 }}>
                                                <p className="mb-2">SubTotal</p>
                                                <p className="mb-2">${total}</p>
                                            </div>
                                            <div className="d-flex justify-content-between" style={{ fontWeight: 500 }}>
                                                <p className="mb-0">Shipping</p>
                                                <p className="mb-0">${Tax}</p>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="d-flex justify-content-between mb-4" style={{ fontWeight: 500 }}>
                                                <p className="mb-2">Total (tax included)</p>
                                                <p className="mb-2">${FinalTotal}</p>
                                            </div>
                                            <button type="button" className="btn btn-primary btn-block btn-lg">
                                                <div className="d-flex justify-content-between">
                                                    <span>Pay Bill</span>
                                                    <span>${FinalTotal}</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <PaymentInputsWrapper {...wrapperProps}>
                                <svg {...getCardImageProps({ images })} />
                                <input {...getCardNumberProps()} />
                                <input {...getExpiryDateProps()} />
                                <input {...getCVCProps()} />
                            </PaymentInputsWrapper>


                        </div>
                    </div>
                </div>
            </section>

        </div>

    );
}

export default Cart;