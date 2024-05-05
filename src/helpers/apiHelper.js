
import * as request from 'superagent';
import { getCurrentUser } from 'helpers/Utils';

export const BASE_URL = `${process.env.NODE_ENV !== 'production'
    ? process.env.REACT_APP_API
    : process.env.REACT_APP_AWS
  }`;

export const isUnauthorizedAccess = function (res) {
  if(res){
    if(Number(res.statusCode) === 401){
      localStorage.clear();
      window.location.reload();
    }
  }else{
    localStorage.clear();
    window.location.reload();
  }
};

const apiCall = (data, type, url) => {
  const currentUser = getCurrentUser();
  let token = '';
  if (currentUser) {
    token = currentUser.token;
  }
  
  return new Promise((resolve, reject) => {
    request[type](`${BASE_URL}/${url}`)
      .send(data)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        isUnauthorizedAccess(res);
        if (res) {
          return resolve(res.body);
        }
        return reject(err);
      });
  });
}

// Use this API if you require to manupilate entire response at component-level,
// and return guiding steps to handle user journey

// See usage: src/modules/providers/form/ProviderMultiForm
const apiFullCall = (data, type, url) => {
  const currentUser = getCurrentUser();
  let token = '';
  if (currentUser) {
    token = currentUser.token;
  }
  
  return new Promise((resolve, reject) => {
    request[type](`${BASE_URL}/${url}`)
      .send(data)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        isUnauthorizedAccess(res);
        if (res) {
          return resolve(res);
        }
        return reject(err);
      });
  });
};

const apiFileUploadCall = (data,type, url) => (
  new Promise((resolve, reject) => {
    const currentUser = getCurrentUser();
    let token = '';
    if (currentUser) {
      token = currentUser.token;
    }
    request[type](`${BASE_URL}/${url}`)
      .send(data)
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        isUnauthorizedAccess(res);
        if (res) {
          return resolve(res);
        }
        return reject(err);
      });
  })
);


export { apiCall, apiFullCall, apiFileUploadCall };