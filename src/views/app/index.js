import React, { Suspense, useState, useEffect } from 'react';
import { Route, withRouter, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { hasPrevilleges, getCurrentUser } from 'helpers/Utils';
import AppLayout from 'layout/AppLayout';

// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './dashboard')
);

const ManageUsers = React.lazy(() =>
  import('./users/UsersPanel')
);


const ManageCompanies = React.lazy(() =>
  import('./companies')
);

const SMS = React.lazy(() =>
    import('./sms/manage-sms/ManageSMS')
)

const ManageSMSApprovals = React.lazy(() =>
    import('./sms/sms-request-approvals/ManageSMSApprovals')
)


const ManageRight = React.lazy(() =>
  import('./system-rights/ManageRight')
);


const ManageRightGroups = React.lazy(() =>
  import('./system-rights/right-groups/RightGroups')
);

const App = ({ match }) => {
  const [loggedInUserSession, setLoggedInUserSession] = useState(null);
  const user = getCurrentUser();
  const history = useHistory();
  const currentLocation = useLocation();

  const updateLoggedInUserSession = () => {
    if (user) {
      setLoggedInUserSession({
        switch_back: user.switch_back,
        logged_in_time: user.logged_in_time,
        frontend_logged_in_time: user.frontend_logged_in_time,
        user_full_name: user.user_full_name,
        branch_id: user.branch_id,
        branch_name: user.branch_name,
        branch_short_name: user.branch_short_name,
        company_id: user.company_id,
        company_name: user.company_name,
        company_short_name: user.company_short_name,
        profile_url: user.profile_url,
        logo_url: user.logo_url,
        city: user.city,
        address: user.address,
        phone_number: user.phone_number,
        branch_address: user.address,
        username: user.username,
        assigned_days: user.assigned_days
      });
    }
  }


  useEffect(() => {
    if (!loggedInUserSession) {
      updateLoggedInUserSession();
    }
  }, []);

  useEffect(() => {
    if (window.location.href.includes('/app/dashboard?a=t')) {
      updateLoggedInUserSession();
      history.push("/app/dashboard");
    }
  }, [currentLocation]);

  return (
    <AppLayout class="dashboard-main" loggedInUserSession={loggedInUserSession} setLoggedInUserSession={setLoggedInUserSession}>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboard`} />
            <Route
              path={`${match.url}/dashboard`}
              render={(props) => <Dashboard {...props} loggedInUserSession={loggedInUserSession} />}
            />
            <Route
              path={`${match.url}/listusers`}
              render={(props) => <ManageUsers {...props} />}
            />
            

            {hasPrevilleges(['MANAGE_COMPANIES']) &&
              <Route
                exact
                path={`${match.url}/companies`}
                render={(props) => <ManageCompanies {...props} loggedInUserSession={loggedInUserSession} />}
              />
            }
            {/* {hasPrevilleges(['SEARCH_CUSTOMER','CUSTOMER_PROFILE']) &&  */}
            
            {hasPrevilleges(['ORGAN_GENERAL_SETTINGS_MANAGE_FEATURES']) &&
              <>
                {window.location.href.includes('/app/manage-sms')  &&
                  <SMS
                    path={`${match.url}/manage-sms`}
                    render={(props) => <SMS {...props} />}
                  />
                }
                {window.location.href.includes('/app/sms-approvals')  &&
                  <Route
                    path={`${match.url}/sms-approvals`}
                    render={(props) => <ManageSMSApprovals {...props} />}
                  />
                }
                <Route
                  path={`${match.url}/system-rights`}
                  render={(props) => <ManageRight {...props} />}
                />
                <Route
                  path={`${match.url}/system-right-groups`}
                  render={(props) => <ManageRightGroups {...props} />}
                />
                
                
              </>
            }
           
            {getCurrentUser() &&
              <Redirect to="/unauthorized" />
            }
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
