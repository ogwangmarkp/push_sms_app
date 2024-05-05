import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthGuardActive,dashboardPath } from 'constants/defaultValues';
import { getCurrentUser,isDevMode } from './Utils';
import SessionTimeout from '../views/user/session-timeout';

const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  const setComponent = (props) => {
    if (isAuthGuardActive) {
      const currentUser = getCurrentUser();
      if (currentUser) {
        const currentUrl = window.location.href;
        if(currentUrl.includes("login") ){
          return <Redirect to={dashboardPath}/>
        }
        if(!isDevMode()){
          return <><SessionTimeout {...props}/> <Component {...props} /></>;
        }
        return <Component {...props} />
      }
      return (
        <Redirect
          to={{
            pathname: '/user/login',
            state: { from: props.location },
          }}
        />
      );
    }
    return <Component {...props} />;
  };

  return <Route {...rest} render={setComponent} />;
};

// eslint-disable-next-line import/prefer-default-export
export { ProtectedRoute };
