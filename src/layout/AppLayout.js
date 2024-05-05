import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

 
import Sidebar from 'containers/navs/Sidebar';
import TopNav from 'containers/navs/Topnav';

const AppLayout = ({ containerClassnames, children, history,loggedInUserSession,setLoggedInUserSession  }) => {
  const [isSubMenu,setIsSubMenu] = useState(false);
  return (
    <div id="app-container" className={`${containerClassnames} ${isSubMenu === true?'':'menu-sub-hidden'}`}>
      <TopNav history={history} isSubMenu = {isSubMenu} setIsSubMenu = {setIsSubMenu} loggedInUserSession = {loggedInUserSession} setLoggedInUserSession = {setLoggedInUserSession}/>
      <Sidebar isSubMenu = {isSubMenu} setIsSubMenu = {setIsSubMenu}/>
      <main>
        <div className="container-fluid">{children}</div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};
const mapActionToProps = {};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(AppLayout)
);
