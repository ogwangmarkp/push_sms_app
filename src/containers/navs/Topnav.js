/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  FormGroup
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { MobileMenuIcon, MenuIcon } from 'components/svg';
import {
  defaultAvatar,
} from 'constants/defaultValues';

import { apiCall, apiFullCall } from 'helpers/apiHelper';
import {updateSwitchedSession } from 'helpers/Utils';
import { NotificationManager } from 'components/common/react-notifications';

const TopNav = ({isSubMenu,setIsSubMenu,history,loggedInUserSession}) => {
    const [userAccountDetails, setUserAccountDetails] = useState({ isOpen: false, username: '', old_password: '', password: '', confirm_password: '' });
    const [acctErrors, setAcctErrors] = useState({});
   
    const expireUserSession = () => {
      apiCall({}, 'post', 'logout/').then(() => {
        localStorage.removeItem('current_logged_in_user');
        history.push(" /user/login");
        NotificationManager.primary('User Management', 'Successfully logged out.', 3000, null, null, 'alert alert-primary animated fadeInDown');
      }).catch((error) => error);
    };
  
    const handleLogout = () => {
      expireUserSession();
    };
  
    const switchBackUser = () => {
      apiCall({ status: "switch_back" }, 'post', 'switch-user/').then((result) => {
        const updatSession = result.data;
        updatSession.switch_back  = false;
        updateSwitchedSession(updatSession);
        NotificationManager.primary('User Management', 'User switched successfully.', 3000, null, null, '');
        history.push("/app/dashboard?a=t");
      }).catch((error) => error);
    };
  const getAccInputValue = (e) => {
    setAcctErrors({});
    setUserAccountDetails({
      ...userAccountDetails,
      [e.target.name]: e.target.value
    });
  }

  const validate = () => {
    let valid = true;
    const errorDetails = {};
    setAcctErrors({});

    if (!userAccountDetails.username) {
      errorDetails.username = 'username is required.';
      valid = false;
    }

    if (!userAccountDetails.password) {
      errorDetails.password = 'password is required.';
      valid = false;
    }

    if (!userAccountDetails.confirm_password) {
      errorDetails.confirm_password = 'confirm password is required.';
      valid = false;
    }

    if (!userAccountDetails.old_password) {
      errorDetails.old_password = 'Old password is required.';
      valid = false;
    }


    if (userAccountDetails.confirm_password && userAccountDetails.password) {
      if (userAccountDetails.password !== userAccountDetails.confirm_password) {
        errorDetails.confirm_password = 'password miss-match.';
        valid = false;
      }
    }

    if (userAccountDetails.password && userAccountDetails.password.length < 6) {
      errorDetails.password = 'password must atleast be 6 charactors long.';
      valid = false;
    }

    setAcctErrors(errorDetails);
    return valid;
  };

  const handleSaveUserDetails = () => {
    if (validate()) {
      apiFullCall({ old_password: userAccountDetails.old_password, new_password: userAccountDetails.password }, 'put', `change-password/`).then((response) => {
        if (response.status === 200 || response.status === 201) {

          NotificationManager.success(
            'success',
            'Credentials updated successfully',
            3000,
            null,
            null,
            ''
          );
          setUserAccountDetails({ ...userAccountDetails, isOpen: false, old_password: '', password: '', confirm_password: '' });

        } else {
          NotificationManager.error(
            'error',
            response.body.message,
            3000,
            null,
            null,
            ''
          );
        }
      }).catch(() => {
        NotificationManager.error(
          'error',
          'Error occurred',
          3000,
          null,
          null,
          ''
        );
      });;
    }
  }
  
  return (
    <>
      <nav className="navbar fixed-top">
        <div className="d-flex align-items-center navbar-left">
          <NavLink
            to="#"
            location={{}}
            className="menu-button d-none d-md-block"
            onClick={() =>setIsSubMenu(!isSubMenu)}
          >
            <MenuIcon />
          </NavLink>
          <NavLink
            to="#"
            location={{}}
            className="menu-button-mobile d-xs-block d-sm-block d-md-none"
            onClick={() => setIsSubMenu(!isSubMenu)}
          >
            <MobileMenuIcon />
          </NavLink>
        </div>
        <div className="d-flex">
          <h4>    
            <span className="name mr-1">
              <>
                <div className="company-name">{loggedInUserSession && loggedInUserSession.company_name}</div>
              </>
            </span>
          </h4>
        </div>
        <div className="navbar-right">
          {loggedInUserSession &&
            <div className="user d-inline-block profile-pic-container">
              <UncontrolledDropdown className="dropdown-menu-right">
                <DropdownToggle className="p-0 company-details" color="empty">
                  <span>
                    <img alt="Profile" src={loggedInUserSession.profile_url ? loggedInUserSession.profile_url : defaultAvatar} />
                  </span>
                </DropdownToggle>
                <DropdownMenu className="mt-3" right>
                  <DropdownItem to="/"><strong>{loggedInUserSession.user_full_name}</strong></DropdownItem>
                  <DropdownItem onClick={() => { setUserAccountDetails({ ...userAccountDetails, isOpen: true, username: loggedInUserSession && loggedInUserSession.username ? loggedInUserSession.username : '', old_password: '', password: '', confirm_password: '' }) }} >Edit Account</DropdownItem>
                  {loggedInUserSession.switch_back && (
                    <>
                      <DropdownItem divider />
                      <DropdownItem onClick={() => { switchBackUser() }} >Switch Back</DropdownItem>
                    </>
                  )}
                  <DropdownItem divider />
                  {loggedInUserSession &&
                    <DropdownItem onClick={() => handleLogout()}>
                      Sign out
                    </DropdownItem>
                  }
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          }
        </div>
      </nav>
      <Modal
        isOpen={userAccountDetails.isOpen}
        backdrop="static"
        centered
      >
        <ModalHeader>
          Account Details
        </ModalHeader>
        <ModalBody>
          <div className="mt-0 mb-0">
            <div className='horizontal-line-words mb-4'> <span>User Account Details</span></div>

            <FormGroup>
              <Label>
                <span>Login Username</span>
              </Label>
              <Input
                type="text"
                value={userAccountDetails.username}
                name="username"
                id="username"
                disabled
                onInput={getAccInputValue}
              />
              {acctErrors.username && (
                <div className="invalid-feedback d-block">
                  {acctErrors.username}
                </div>
              )
              }
            </FormGroup>
            <FormGroup>
              <Label>
                <span>Old Password</span>
              </Label>
              <Input
                type="password"
                name="old_password"
                id="old_password"
                value={userAccountDetails.old_password}
                onInput={getAccInputValue}
              />
              {acctErrors.old_password && (
                <div className="invalid-feedback d-block">
                  {acctErrors.old_password}
                </div>
              )
              }
            </FormGroup>
            <FormGroup>
              <Label>
                <span>Login Password <small className='text-danger'>Must be atleast 6 charactors</small></span>
              </Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={userAccountDetails.password}
                onInput={getAccInputValue}
              />
              {acctErrors.password && (
                <div className="invalid-feedback d-block">
                  {acctErrors.password}
                </div>
              )
              }
            </FormGroup>
            <FormGroup>
              <Label>
                <span>Confirm Login Password</span>
              </Label>
              <Input
                type="password"
                name="confirm_password"
                id="confirm_password"
                value={userAccountDetails.confirm_password}
                onInput={getAccInputValue}
              />
              {acctErrors.confirm_password && (
                <div className="invalid-feedback d-block">
                  {acctErrors.confirm_password}
                </div>
              )
              }
            </FormGroup>

          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={() => { setUserAccountDetails({ ...userAccountDetails, isOpen: false }) }}>
            Cancel
          </Button>
          <Button color="primary" onClick={() => { handleSaveUserDetails(); }}>
            Submit
          </Button>{' '}
        </ModalFooter>
      </Modal>
    </>
  );
};
export default TopNav;
