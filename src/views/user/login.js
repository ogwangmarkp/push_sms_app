import React, { useState} from 'react';
import {
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  FormGroup
} from 'reactstrap';
import { NotificationManager } from 'components/common/react-notifications';
import {dashboardPath,defaultAvatar,defaultOrgLogo} from 'constants/defaultValues';
import {apiFullCall} from 'helpers/apiHelper';
import {setCurrentUser} from 'helpers/Utils';
import Header from 'containers/navs/Header';
import HomeContent from 'containers/navs/HomeContent';
import Footer from 'containers/navs/Footer';

const Login = ({history}) => {
  const [userAccountDetails, setUserAccountDetails] = useState({ isOpen: false, username: '', old_password: '', password: '', confirm_password: '' });
  const [acctErrors, setAcctErrors] = useState({});
  
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
    setAcctErrors(errorDetails);
    return valid;
  };

  const handleSaveUserDetails = () => {
    if (validate()) {
      apiFullCall({ username: userAccountDetails.username,password: userAccountDetails.password }, 'post', `token-auth/`).then((response) => {
        if (response.status === 200 || response.status === 201) {
          const loginUser = response.body;
          if (loginUser.token) {
            const item = {
              uid: loginUser.user.id,
              token:loginUser.token,
              old_uid:null,
              old_token:null,
              switch_back:false,
              logged_in_time:(new Date(loginUser.logged_in_time)),
              user_full_name: `${loginUser.user.name? loginUser.user.name: `Demo 2020`}`,
              img: '/assets/img/profiles/l-1.jpg',
              date: 'Last seen today 15:24',
              role:loginUser.role,
              company_id:loginUser.company && loginUser.company.id,
              company_name:loginUser.company && loginUser.company.name,
              logo_url:loginUser.company.logo_url?loginUser.company.logo_url:defaultOrgLogo,
              company_short_name:loginUser.company && loginUser.company.short_name,
              branch_id:loginUser.branch && loginUser.branch.id,
              branch_name:loginUser.branch && loginUser.branch.name,
              branch_short_name:loginUser.branch && loginUser.branch.short_name,
              company_settings:loginUser.company_settings,
              permissions:loginUser.permissions,
              profile_url:loginUser.profile_url? loginUser.profile_url:defaultAvatar,
              city: loginUser.company && loginUser.company.city,
              address:loginUser.company && loginUser.company.address,
              phone_number:loginUser.company && loginUser.company.phone_number,
              branch_address:loginUser.branch && loginUser.branch.address,
              username:loginUser.user.username,
              assigned_days:loginUser.user.assigned_days
            }
            setCurrentUser(item);
            NotificationManager.success(
              'success',
              'Logged in successfully',
              3000,
              null,
              null,
              ''
            );
            // localStorage.setItem('lastActivityTime',moment().add(SESSION_IDEL_MINUTES + 1, 'minutes').format('YYYY-MM-DD HH:mm'));
            setUserAccountDetails({ ...userAccountDetails, isOpen: false, username:'', password: '',});
            history.push(`${dashboardPath}?a=t`);
              /*
             */
          } else {
            NotificationManager.error(
              'error',
              'Wrong usernane or Password',
              3000,
              null,
              null,
              ''
            );
          } 
        } else {
          NotificationManager.error(
            'error',
            'Wrong usernane or Password',
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

  const closeBtn = (<button className="close ml-1" onClick={() => { setUserAccountDetails({ ...userAccountDetails, isOpen: false }) }} type="button">&times;</button>
  );


  return (
      <div>
        <Header setUserAccountDetails = {setUserAccountDetails} userAccountDetails = {userAccountDetails}/>
        <HomeContent/>
        <Footer/>
        <Modal
          isOpen={userAccountDetails.isOpen}
          backdrop="static"
          centered
        >
          <ModalHeader close={closeBtn}>
            Account Details
          </ModalHeader>
          <ModalBody>
            <div className="mt-0 mb-0">
              <FormGroup>
                <Label>
                  <span>Username</span>
                </Label>
                <Input
                  type="text"
                  value={userAccountDetails.username}
                  name="username"
                  id="username"
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
                  <span>Password</span>
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
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => { handleSaveUserDetails(); }}>
              Submit
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
  );
};
export default Login;
