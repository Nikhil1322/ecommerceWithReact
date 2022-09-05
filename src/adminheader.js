import React from 'react';
import { Link } from 'react-router-dom';

const AdminHeader = () =>{
return(
<nav className="navbar navbar-expand-sm navbar-dark bg-info sticky-top p-3">
  <div className="container-fluid">
    <a className="navbar-brand"> <i className='fa fa-shopping-bag fa-lg'></i> Admin Panel </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="mynavbar">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/"> 
            <i className='fa fa-home'></i> Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/manageproduct"> 
            <i className='fa fa-suitcase'></i> Manage Product
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/manageorder"> 
            <i className='fa fa-headset'></i> Manage Order
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="javascript:void(0)" onClick={logout}> 
            Welcome Admin <i className='fa fa-power-off text-danger'> Logout </i> 
          </a>
        </li>
      </ul>
    </div>
  </div>
  </nav>
    )
}

export default AdminHeader;

const logout = () =>{
    localStorage.clear();
    window.location.href="http://localhost:3000/#/";
    // window.location.href="http://localhost:5500/#/";
    window.location.reload();
}