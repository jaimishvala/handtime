import React from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeContext from '../../Context/theme.context';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

function Header(props) {
  const theme = useContext(ThemeContext)
  console.log(theme);

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

              {
                theme.theme === 'light' ?
                  <DarkModeOutlinedIcon onClick={() => theme.toggleTheme(theme.theme)} /> :
                  <LightModeOutlinedIcon onClick={() => theme.toggleTheme(theme.theme)} />
              }


              <div className="user_optio_box">
                <a href="/Auth">
                  <i className="fa fa-user" aria-hidden="true" />
                </a>
                <a href="/Cart">
                  <i className="fa fa-shopping-cart" aria-hidden="true" />
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div >

  );
}

export default Header;