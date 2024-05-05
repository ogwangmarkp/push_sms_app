import React,{useState} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TopNav from 'containers/navs/Topnav';
// import Footer from 'containers/navs/Footer';
import TopnavMenu from 'containers/navs/Top.Menu';
import {hasPrevilleges} from 'helpers/Utils';

const AppLayout = ({ containerClassnames, children, history,selectCustomerProfile,loggedInUserSession,setLoggedInUserSession }) => {
  const [isMenuLocked, setIsMenuLocked] = useState(false);
  const [isSelectedTopMenu, setIsSelectedTopMenu] = useState('');
  const [isDropDown, setIsDropDown] = useState(false);

  const updateTopMenu = (ev) => {
    const currentElement = ev.target;
    if (!(currentElement.closest(".is-selected-menu") || currentElement.classList.contains('is-selected-menu'))) {
        setIsDropDown(false); 
        setIsMenuLocked(false);
        setIsSelectedTopMenu('');
        Array.from(document.querySelectorAll('.my-button')).forEach(
          (el) => el.classList.remove('active')
        );
    }
  };
  window.addEventListener("click", updateTopMenu, false);

  /* return (
    <div id="app-container" className= {`${containerClassnames} fixed-top`}>
      <TopNav history={history} selectCustomerProfile = {selectCustomerProfile} loggedInUserSession = {loggedInUserSession} setLoggedInUserSession = {setLoggedInUserSession}/>
      <div className='top-nav-menu'>
        <TopnavMenu isMenuLocked = {isMenuLocked} setIsMenuLocked = {setIsMenuLocked} isDropDown = {isDropDown} setIsDropDown  = {setIsDropDown} isSelectedTopMenu = {isSelectedTopMenu} setIsSelectedTopMenu = {setIsSelectedTopMenu} hasPrevilleges = {hasPrevilleges}/>
      </div>
      <main className="dashboard-main">
        <div className="container-fluid">{children}</div>
      </main>
      { <Footer />}
    </div>
  ); */
};
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};
const mapActionToProps = {};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(AppLayout)
);
