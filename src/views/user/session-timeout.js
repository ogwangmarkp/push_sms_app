  
  import React, {useEffect} from 'react';
  import moment from 'moment';
  import {useLocation} from 'react-router-dom';
  import {SESSION_IDEL_MINUTES} from 'constants/defaultValues';
  import { apiCall} from 'helpers/apiHelper';
  import { getCurrentUser,getLastActivityTime,isDevMode} from 'helpers/Utils';
  import ManageIdleTime from './manage-idle-time'

  const SessionTimeout = ({ history}) => {
    const location = useLocation();

    const updateLastActivityTime = () => {

      if(getCurrentUser()){

        let lastActivityTime = getLastActivityTime();
        if(!lastActivityTime){
          lastActivityTime  = moment().format('YYYY-MM-DD HH:mm')
        }else{
          lastActivityTime  = moment(lastActivityTime).format('YYYY-MM-DD HH:mm')
        }

        lastActivityTime = moment(lastActivityTime).add(SESSION_IDEL_MINUTES + 1, 'minutes').format('YYYY-MM-DD HH:mm');
        if(moment().format('YYYY-MM-DD HH:mm') > lastActivityTime){

          apiCall({}, 'post', 'logout/').then(() => {
          }).catch((error) => error);

          localStorage.clear();
          history.push("/user/login");
        }

        localStorage.setItem('lastActivityTime',moment().format('YYYY-MM-DD HH:mm'));
      }
    };

    useEffect(() => {
       window.addEventListener("click", updateLastActivityTime, false);
    }, []);

    useEffect(() => {
       updateLastActivityTime();
    }, [location]);

    if(isDevMode()){
      return <ManageIdleTime history = {history}/>;
    }
    return null;
  };
  
  export default SessionTimeout;