import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({setUserAccountDetails, userAccountDetails}) => {
  return (
    <div className="page-header pl-4 pr-4">
      <span className="mb-0 float-left">Easy Notify</span>
      <ul className="breadcrumb pt-0 pr-0 float-right">
            <li className="breadcrumb-item mb-0">
              <NavLink className="btn-link" to="#" location={{}} onClick={() => { setUserAccountDetails({ ...userAccountDetails, isOpen: true }) }}>
                Login
              </NavLink>
            </li>
      </ul>
    </div>
  );
};
export default Header;
