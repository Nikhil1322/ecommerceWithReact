import React from 'react';
import { Link } from 'react-router-dom';

const PublicHeader = () =>{
return(
<nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top p-3">
  <div className="container-fluid">
    <a className="navbar-brand"> <i className='fa fa-shopping-bag fa-lg'></i> Keep Buying </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="mynavbar">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/"> 
            <i className='fa fa-home'></i> Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/cart"> 
            <i className='fa fa-shopping-cart'></i> My Cart
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/login"> 
            <i className='fa fa-lock'></i> Login
          </Link>
        </li>
      </ul>
    </div>
  </div>
  </nav>
    )
}

export default PublicHeader;