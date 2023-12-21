import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeContext from '../../Context/theme.context';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useSelector } from 'react-redux';

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function Header() {

  // const [search, setSearch] = useState('')
  // const [originalData, setOriginalData] = useState([]);

  const theme = useContext(ThemeContext)
  console.log(theme);

  const cart = useSelector(state => state.cart)
  console.log(cart);

  const cartCount = cart.cart.reduce((acc, v) => acc + v.qty, 0)
  console.log(cartCount);


  // const getData = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/home");
  //     const data = await response.json();
  //     console.log(data);
  //     setOriginalData(data); // Save the original data to state
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  // const handleSearch = (value) => {
  //   console.log(value, search);

  //   setSearch(value);

  //   const fdata = originalData.filter((v) => {
  //     return v.search.toLowerCase().includes(value.toLowerCase());
  //   })

  //   console.log(fdata);
  // }

  return (
    <div>
      <header className="header_section">
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


              {/* <SearchIcon />
              <input
                name='text'
                type='text'
                placeholder='Searching...'
              onChange={(event) => handleSearch(event.target.value)}
              /> */}


              {
                theme.theme === 'light' ?
                  <DarkModeOutlinedIcon onClick={() => theme.toggleTheme(theme.theme)} /> :
                  <LightModeOutlinedIcon onClick={() => theme.toggleTheme(theme.theme)} />
              }


              <div className="user_optio_box">

                <Link to="/Auth">
                  <IconButton aria-label="Auth">
                    {/* <StyledBadge badgeContent={cartCount} color="secondary"> */}
                    {/* <ShoppingCartIcon /> */}
                    <i className="fa fa-user" aria-hidden="true" />
                    {/* sx={{ color: theme.theme === 'light' ? 'gray' : 'white' }} style={{ width: "20px" }} */}
                    {/* </StyledBadge> */}
                  </IconButton>
                </Link>

                {/* <Link to={"/Cart"}>
                  <i className="fa fa-shopping-cart" aria-hidden="true" />{cartCount}
                </Link> */}

                <Link to="/Cart">
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={cartCount} color="secondary">
                      {/* <ShoppingCartIcon /> */}
                      <i className="fa fa-shopping-cart" aria-hidden="true" />
                      {/* sx={{ color: theme.theme === 'light' ? 'gray' : 'white' }} style={{ width: "20px" }} */}
                    </StyledBadge>
                  </IconButton>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div >

  );
}

export default Header;