import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import ThemeContext from '../../Context/theme.context';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useDispatch, useSelector } from 'react-redux';

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { logoutRequest } from '../../redux/action/auth.action';
import { getWatchSubCat } from '../../redux/slice/watchsub.slice';
import { getWatchCat } from '../../redux/slice/watchcat.slice';


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function Header({ setResult }) {

  let auth = useSelector(state => state.auth)

  const order = useSelector(state => state.order)
  console.log(order.order);

  const allOrder = order.order
  console.log(allOrder);

  const theme = useContext(ThemeContext)

  const cart = useSelector(state => state.cart)

  const cartCount = cart.cart.reduce((acc, v) => acc + v.qty, 0)

  const watchsubcat = useSelector(state => state.watchsubcat)
  const watchcat = useSelector(state => state.watchcat)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getWatchSubCat())
    dispatch(getWatchCat())
  }, [])

  const handleLogOut = () => {
    console.log("logOut");
    dispatch(logoutRequest());

  }

  const handleOrderData = (value) => {
    if (value === 'my_order') {
      const userUid = auth.user.uid;
      console.log(userUid);

      // Filter order data based on user UID
      const userOrders = allOrder.filter(order => order.uid === userUid);
      console.log(userOrders);

      setResult(userOrders);
      navigate('/OrderData');
    } else {
      navigate('/');
    }
  }

  return (

    <div>
      {/* <header className="header_section">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container ">
            <a className="navbar-brand" href="index.html">
              <span>
                HandTime
              </span>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className> </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className={({ isActive }) => isActive ? "nav-link scrollto active" : "nav-link scrollto"} to="/">Home</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className={({ isActive }) => isActive ? "nav-link scrollto active" : "nav-link scrollto"} to="/About"> About</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => isActive ? "nav-link scrollto active" : "nav-link scrollto"} to="/Watch">Watch</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => isActive ? "nav-link scrollto active" : "nav-link scrollto"} to="/Product">Products</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => isActive ? "nav-link scrollto active" : "nav-link scrollto"} to="/Testimonial">Testimonial</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => isActive ? "nav-link scrollto active" : "nav-link scrollto"} to="/Contact" >Contact Us</NavLink>
                </li>
              </ul>


              {
                auth.user ?
                  <Link to="/">
                    <IconButton aria-label="Auth">
                      <span className="d-none d-md-inline" onClick={() => handleLogOut()}>Logout</span>
                      <i className="fa fa-user" aria-hidden="true" />
                    </IconButton>
                  </Link>
                  :
                  <Link to="/Auth">
                    <IconButton aria-label="Auth">
                      <span className="d-none d-md-inline">Login/ Signup</span>
                      <i className="fa fa-user" aria-hidden="true" />
                    </IconButton>
                  </Link>
              }


              {
                theme.theme === 'light' ?
                  <DarkModeOutlinedIcon onClick={() => theme.toggleTheme(theme.theme)} /> :
                  <LightModeOutlinedIcon onClick={() => theme.toggleTheme(theme.theme)} />
              }


              <div className="user_optio_box">
                <Link to="/Cart">
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={cartCount} color="secondary">
                      <i className="fa fa-shopping-cart" aria-hidden="true" />
                    </StyledBadge>
                  </IconButton>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header> */}

      <header class="navbar sticky">
        <a href="/" class="logo">HandTime</a>
        <div class="menu-btn">
          <div class="menu-btn__lines"></div>
        </div>
        <ul class="menu-items">
          <li className="nav-item">
            <NavLink className={({ isActive }) => isActive ? "nav-link scrollto active" : "nav-link scrollto"} style={{borderColor:"orange"}} to="/">Home</NavLink>
          </li>

          <li>
            <NavLink className={({ isActive }) => isActive ? "nav-link scrollto active" : "nav-link scrollto"} class="menu-item first-item expand-btn" to="/Product">Watch</NavLink>
            <div class="mega-menu sample">
              <div class="content">

                <div class="col">
                  <section>
                    <NavLink class="menu-title" to="/Product/Men">MENS</NavLink>
                    <ul class="mega-links">
                      {
                        watchsubcat.watchsubcat.map((subCategory) => {
                          const menCategory = watchcat.watchcat.find((category) => category.category_name === 'MENS');
                          if (menCategory && subCategory.category_id === menCategory.id) {
                            return (
                              <li key={subCategory.id}><Link to={'/Product/' + subCategory.id}>{subCategory.sub_name}</Link></li>
                            )
                          } else {
                            return null
                          }
                        })
                      }

                    </ul>
                  </section>
                </div>
                <div class="col">
                  <section>
                    <NavLink class="menu-title" to="/Product/Women">WOMENS</NavLink>
                    <ul class="mega-links">


                      {
                        watchsubcat.watchsubcat.map((subCategory) => {
                          const menCategory = watchcat.watchcat.find((category) => category.category_name === 'WOMENS');
                          if (menCategory && subCategory.category_id === menCategory.id) {
                            return (
                              <li key={subCategory.id}><Link to={'/Product/' + subCategory.id}>{subCategory.sub_name}</Link></li>
                            )
                          } else {
                            return null
                          }
                        })
                      }

                    </ul>
                  </section>
                </div>
                <div class="col">
                  <section>
                    <NavLink class="menu-title" to="/Product/Watches">WATCHES</NavLink>
                    <ul class="mega-links">


                      {
                        watchsubcat.watchsubcat.map((subCategory) => {
                          const menCategory = watchcat.watchcat.find((category) => category.category_name === 'WATCHES');
                          if (menCategory && subCategory.category_id === menCategory.id) {
                            return (
                              <li key={subCategory.id}><Link to={'/Product/' + subCategory.id}>{subCategory.sub_name}</Link></li>
                            )
                          } else {
                            return null
                          }
                        })
                      }


                    </ul>
                  </section>
                </div>
              </div>
            </div>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => isActive ? "nav-link scrollto active" : "nav-link scrollto"} to="/About"> About</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => isActive ? "nav-link scrollto active" : "nav-link scrollto"} to="/Testimonial">Testimonial</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => isActive ? "nav-link scrollto active" : "nav-link scrollto"} to="/Contact" >Contact Us</NavLink>
          </li>
        </ul>


        <div className="form-group col-md-4">
          <select
            id="order_data"
            name='order_data'
            onChange={(e) => handleOrderData(e.target.value)}
            className="form-control"
            style={{ width: "30%" }}
          >
            <option value="0">--Select Option--</option>
            <option value="my_order">My Order</option>
          </select>
        </div>

        {
          theme.theme === 'light' ?
            <DarkModeOutlinedIcon onClick={() => theme.toggleTheme(theme.theme)} /> :
            <LightModeOutlinedIcon onClick={() => theme.toggleTheme(theme.theme)} />
        }

        <div className="user_optio_box">
          <Link to="/Cart">
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={cartCount} color="secondary">
                <i className="fa fa-shopping-cart" aria-hidden="true" />
              </StyledBadge>
            </IconButton>
          </Link>
        </div>

        {
          auth.user ?
            <Link to="/">
              <IconButton aria-label="Auth">
                <span className="d-none d-md-inline" onClick={() => handleLogOut()}>Logout</span>
                <i className="fa fa-user" aria-hidden="true" />
              </IconButton>
            </Link>
            :
            <Link to="/Auth">
              <IconButton aria-label="Auth">
                <span className="d-none d-md-inline">Login/ Signup</span>
                <i className="fa fa-user" aria-hidden="true" />
              </IconButton>
            </Link>
        }

      </header>

    </div >

  );
}

export default Header;
