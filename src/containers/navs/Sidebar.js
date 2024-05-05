/* eslint-disable react/no-array-index-key */
import React, {useState} from 'react';
import { Nav, NavItem} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import RightsMenu from './submenus/RightsMenu'
import UsersMenu from './submenus/UsersMenu'

const Sidebar = ({isSubMenu,setIsSubMenu}) => {
  const [parentMenu, setParentMenu] = useState('');

  return (
      <div className="sidebar">
        <div className="main-menu">
          <div className="scroll">
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <Nav vertical className="list-unstyled">
                    
                    <NavItem
                      key='users'
                    >
                      <NavLink to="/app/listusers"
                        onClick={() =>{setIsSubMenu(false); setParentMenu('users')}}
                      >
                        <i className='iconsminds-shop-4' />{' '}
                        Users
                      </NavLink>
                    </NavItem>
                    <NavItem
                      key='manage-sms'
                    >
                      <NavLink to="/app/manage-sms"
                        onClick={() =>{setIsSubMenu(false); setParentMenu('manage-sms')}}
                      >
                        <i className='iconsminds-shop-4' />{' '}
                        SMS
                      </NavLink>
                    </NavItem>
                    <NavItem
                      key='dashboards'
                    >
                      <NavLink
                          to='#'
                          aria-hidden="true"
                          onClick={() =>{setIsSubMenu(!isSubMenu); setParentMenu('system-rights');}}
                        >
                          <i className='iconsminds-shop-4' />{' '}
                          Settings
                        </NavLink>
                    </NavItem>
              </Nav>
            </PerfectScrollbar>
          </div>
        </div>

        <div className="sub-menu">
          <div className="scroll">
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              {parentMenu === 'system-rights' && (
                <RightsMenu isSubMenu = {isSubMenu} setIsSubMenu = {setIsSubMenu}/>
              )}
              {parentMenu === 'users' && (
                <UsersMenu isSubMenu = {isSubMenu} setIsSubMenu = {setIsSubMenu}/>
              )}
            </PerfectScrollbar>
          </div>
        </div>
    </div> 
    );
}

export default Sidebar
