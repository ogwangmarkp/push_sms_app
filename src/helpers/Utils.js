/* eslint-disable no-restricted-properties */
/* eslint-disable prefer-template */
/* eslint-disable no-else-return */

import {
  defaultDirection,
  defaultLocale,
  defaultColor,
  localeOptions,
  themeColorStorageKey,
  themeRadiusStorageKey,
  defaultOrgLogo,
  defaultAvatar
} from 'constants/defaultValues';
import AWS from 'aws-sdk';
import * as FileSaver from "file-saver";
import XLSX from 'sheetjs-style';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_S3_REGION_NAME,
  signatureVersion: process.env.REACT_APP_AWS_S3_SIGNATURE_VERSION,
});

export const mapOrder = (array, order, key) => {
  // eslint-disable-next-line func-names
  array.sort(function (a, b) {
    const A = a[key];
    const B = b[key];
    if (order.indexOf(`${A}`) > order.indexOf(`${B}`)) {
      return 1;
    }
    return -1;
  });
  return array;
};

export const getDateWithFormat = () => {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; // January is 0!

  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${dd}.${mm}.${yyyy}`;
};

export const getCurrentTime = () => {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}`;
};

export const getDirection = () => {
  let direction = defaultDirection;

  try {
    if (localStorage.getItem('direction')) {
      const localValue = localStorage.getItem('direction');
      if (localValue === 'rtl' || localValue === 'ltr') {
        direction = localValue;
      }
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : getDirection -> error', error);
    direction = defaultDirection;
  }
  return {
    direction,
    isRtl: direction === 'rtl',
  };
};
export const setDirection = (localValue) => {
  let direction = 'ltr';
  if (localValue === 'rtl' || localValue === 'ltr') {
    direction = localValue;
  }
  try {
    localStorage.setItem('direction', direction);
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setDirection -> error', error);
  }
};

export const getCurrentColor = () => {
  let currentColor = defaultColor;
  try {
    if (localStorage.getItem(themeColorStorageKey)) {
      currentColor = localStorage.getItem(themeColorStorageKey);
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : getCurrentColor -> error', error);
    currentColor = defaultColor;
  }
  currentColor = defaultColor;
  return currentColor;
};

export const setCurrentColor = (color) => {
  try {
    localStorage.setItem(themeColorStorageKey, color);
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setCurrentColor -> error', error);
  }
};

export const getCurrentRadius = () => {
  let currentRadius = 'rounded';
  try {
    if (localStorage.getItem(themeRadiusStorageKey)) {
      currentRadius = localStorage.getItem(themeRadiusStorageKey);
    }
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : getCurrentRadius -> error',
      error
    );
    currentRadius = 'rounded';
  }
  return currentRadius;
};

export const setCurrentRadius = (radius) => {
  try {
    localStorage.setItem(themeRadiusStorageKey, radius);
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : setCurrentRadius -> error',
      error
    );
  }
};

export const getCurrentLanguage = () => {
  let language = defaultLocale;
  try {
    language =
      localStorage.getItem('currentLanguage') &&
        localeOptions.filter(
          (x) => x.id === localStorage.getItem('currentLanguage')
        ).length > 0
        ? localStorage.getItem('currentLanguage')
        : defaultLocale;
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : getCurrentLanguage -> error',
      error
    );
    language = defaultLocale;
  }
  return language;
};
export const setCurrentLanguage = (locale) => {
  try {
    localStorage.setItem('currentLanguage', locale);
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : setCurrentLanguage -> error',
      error
    );
  }
};

export const isJson = (str) => {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
};

export const getVlsaList = (data) => {
  const list = [];

  if(isJson(data)){
      const fieldIds = JSON.parse(data);
      if(Array.isArray(fieldIds)){
        fieldIds.forEach((fieldId) =>{
          if(!Number.isNaN(fieldId)){
              list.push(Number(fieldId));
          }
        });
      }
  }
  return list;
};

export const getLastActivityTime = () => {
  if(localStorage.getItem('lastActivityTime') !== null){
    return localStorage.getItem('lastActivityTime');  
  }
  return null;
};

export const getCurrentUser = () => {
  let user = null;
  try {
    user =
      localStorage.getItem('current_logged_in_user') !== null && localStorage.getItem('current_logged_in_user') !== 'undefined'
        ? JSON.parse(localStorage.getItem('current_logged_in_user'))
        : null;
  } catch (error) {
    console.log(error);
    user = null;
  }
  return user;
};

export const setCurrentUser = (user) => {
  const allPermission = [];
  try {
    if (user) {
      if (user.permissions) {
        user.permissions.forEach(permission => {
          allPermission.push(permission.key);
        });
      }
      user.frontend_logged_in_time = (new Date())
      user.permissions = allPermission;
      localStorage.setItem('current_logged_in_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('current_logged_in_user');
      window.location.reload();
    }
  } catch (error) {
    console.log('Logged In user Error -> error', error);
  }
};

export const updateSwitchedSession = (switchedSession) => {
  if (switchedSession.token) {
    const item = {
      uid: switchedSession.user.id,
      token: switchedSession.token,
      old_uid:switchedSession.old_user.id,
      old_token:switchedSession.old_token,
      switch_back:switchedSession.switch_back,
      assigned_days:switchedSession.user.assigned_days,
      logged_in_time:(new Date(switchedSession.logged_in_time)),
      user_full_name: `${switchedSession.user.name ? switchedSession.user.name : `Demo 2020`}`,
      img: '/assets/img/profiles/l-1.jpg',
      date: (new Date(switchedSession.logged_in_time)),
      role: switchedSession.role,
      company_id: switchedSession.company && switchedSession.company.id,
      company_name: switchedSession.company && switchedSession.company.name,
      logo_url: switchedSession.company.logo_url ? switchedSession.company.logo_url : defaultOrgLogo,
      company_short_name: switchedSession.company && switchedSession.company.short_name,
      branch_id: switchedSession.branch && switchedSession.branch.id,
      branch_name: switchedSession.branch && switchedSession.branch.name,
      branch_short_name: switchedSession.branch && switchedSession.branch.short_name,
      company_settings: switchedSession.company_settings,
      permissions: switchedSession.permissions,
      profile_url: switchedSession.profile_url ? switchedSession.profile_url : defaultAvatar,
      city: switchedSession.company && switchedSession.company.city,
      address: switchedSession.company && switchedSession.company.address,
      phone_number: switchedSession.company && switchedSession.company.phone_number,
      branch_address: switchedSession.branch && switchedSession.branch.address
    }
    setCurrentUser(item);
  }
}

export const numberFormat = (inputNumber, dp = 0, currency = '') => {
  let formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: dp
  });

  if (currency === 'yes') {
    formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: dp,
      style: 'currency',
      currency: 'UGX',
    });
  }

  return formatter.format(inputNumber);
}

export const checkSystemTimeSetting = () => {
  let isValid = false;
  const currentUser = getCurrentUser();
  const diff = Math.round(Math.abs((currentUser.logged_in_time).getTime() - (currentUser.frontend_logged_in_time).getTime()) / 3600000);
  if(diff <= 0){
    isValid = true;
  }
  return isValid;
}               
export const hasPrevilleges = (selectedPermissions) => {
  const currentUser = getCurrentUser();
  let allPermissions = [];
  let status = false;

  if (currentUser) {
    if (currentUser.role) {
      if (currentUser.role === "ROOT_ADMIN") {
        return true;
      }
    }
    allPermissions = currentUser.permissions;
    if (selectedPermissions.length > 0) {
      if (Array.isArray(selectedPermissions)) {
        selectedPermissions.forEach((res) => {
          if (allPermissions && allPermissions.includes(res)) {
            status = true;
          }
        });
      } else if (allPermissions && allPermissions.includes(selectedPermissions)) {
        status = true;
      }
      return status;
    }
  } 
  return true;
};



export const currencyFormat = (num, precision) => {
  if (Number.isNaN(num)) {
    return num;
  }
  return Number(num).toFixed(precision).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
};

export const currencyNumberInputFormat = (num) => {
  return String(num).replace(/\D/g, "").toLocaleString('en-US').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
};

export const getUrlParameter = function (name) {
  const results = new RegExp(`[?&]${name}=([^&#]*)`).exec(window.location.href);
  return results !== null ? results[1] : 0;
};

export const updateUrlParameter = function (newPath) {
  const url = window.location.href;
  window.location.replace(`${url.split('#')[0]}#/app/${newPath}`);
};

export const isDevMode = function () {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  return false;
};

export const uploadFileToAws = async (file, folder = '') => {
  const s3 = new AWS.S3();
  const key = folder !== '' ? `${folder}${Date.now()}.${file.name}` : `${Date.now()}.${file.name}`;
  const params = {
    Bucket: process.env.REACT_APP_AWS_STORAGE_BUCKET_NAME,
    Key: key,
    Body: file
  };

  const { Location } = await s3.upload(params).promise();
  return Location;
}

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const clientFiles = (account, filterType) => {
  let result = {};
  if (account.customer_files) {
    if (Array.isArray(account.customer_files)) {
      account.customer_files.forEach((res) => {
        if (res.file_type === 'profile_pic' && filterType === 'profile_pic') {
          result = res;
        }
        if (res.file_type === 'signature_pic' && filterType === 'signature_pic') {
          result = res;
        }
      });
    }
  }
  if (result.url) {
    return result;
  }
  return false;
};

export const exportToCSVOnClick = (exportata, fileName, downloadType) => {
  const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = `.${downloadType}`;
  const ws = XLSX.utils.json_to_sheet(exportata);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: downloadType, type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
};

export const numberToWords = (amount) => {
  const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const teens = ["", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  function convertTwoDigit(num) {
    if (num < 10) {
      return units[num];
    } else if (num < 20) {
      return teens[num - 10];
    } else {
      const tensDigit = Math.floor(num / 10);
      const unitsDigit = num % 10;
      return tens[tensDigit] + (unitsDigit !== 0 ? "-" + units[unitsDigit] : "");
    }
  }

  function convertThreeDigit(num) {
    const hundredsDigit = Math.floor(num / 100);
    const twoDigitPart = num % 100;

    let result = "";

    if (hundredsDigit > 0) {
      result += units[hundredsDigit] + " Hundred";
    }

    if (twoDigitPart > 0) {
      if (result !== "") {
        result += " and ";
      }
      result += convertTwoDigit(twoDigitPart);
    }

    return result;
  }

  if (Number.isNaN(amount)) {
    return "Invalid input";
  }

  if (amount === 0) {
    return "Zero";
  }

  if (amount > 999999999999) {
    return "Number too large";
  }

  const billionPart = Math.floor(amount / 1000000000);
  const millionPart = Math.floor((amount % 1000000000) / 1000000);
  const thousandPart = Math.floor((amount % 1000000) / 1000);
  const lastThreeDigits = Math.floor(amount % 1000);

  let result = "";

  if (billionPart > 0) {
    result += convertThreeDigit(billionPart) + " Billion";
  }

  if (millionPart > 0) {
    if (result !== "") {
      result += " ";
    }
    result += convertThreeDigit(millionPart) + " Million";
  }

  if (thousandPart > 0) {
    if (result !== "") {
      result += " ";
    }
    result += convertThreeDigit(thousandPart) + " Thousand";
  }

  if (lastThreeDigits > 0) {
    if (result !== "") {
      result += " ";
    }
    result += convertThreeDigit(lastThreeDigits);
  }

  return result;
}