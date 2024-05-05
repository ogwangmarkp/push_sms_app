import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { apiCall } from 'helpers/apiHelper';
import moment from 'moment';
import { adminRoot,dashboardPath,defaultAvatar,defaultOrgLogo,SESSION_IDEL_MINUTES} from 'constants/defaultValues';
import { setCurrentUser,getCurrentUser } from 'helpers/Utils';
import {
  LOGIN_USER,
  LOGOUT_USER,
} from '../contants';

import {
  loginUserSuccess,
  loginUserError,
} from './actions';

export function* watchLoginUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (email, password) =>
  // eslint-disable-next-line no-return-await
  await apiCall({ username: email, password }, 'post', 'token-auth/')
    .then((user) => user)
    .catch((error) => error);

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    if(!getCurrentUser()){
      const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
     
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
        localStorage.setItem('lastActivityTime',moment().add(SESSION_IDEL_MINUTES + 1, 'minutes').format('YYYY-MM-DD HH:mm'));
        yield put(loginUserSuccess(item));
        history.push(`${dashboardPath}?a=t`);
      } else {
        yield put(loginUserError('Wrong usernane or Password'));
      }
    }else{
      history.push(dashboardPath);
    }
  } catch (error) {
    yield put(loginUserError(error));
  }
}


export function* watchLogoutUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
  history.push(adminRoot);
};

function* logout({ payload }) {
  const { history } = payload;
  setCurrentUser();
  yield call(logoutAsync, history);
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser)
  ]);
  // fork(watchForgotPassword),
  // fork(watchResetPassword),
}
