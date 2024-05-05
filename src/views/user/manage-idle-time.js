
import { useIdleTimer } from 'react-idle-timer'
import {SESSION_IDEL_MINUTES} from 'constants/defaultValues';
import { apiCall} from 'helpers/apiHelper';
import { getCurrentUser} from 'helpers/Utils';

const ManageIdleTime = ({ history}) => {

    const handleOnIdle = () => {
        if(getCurrentUser()){
            apiCall({}, 'post', 'logout/').then(() => {
            localStorage.clear();
            history.push("/user/login");
            }).catch((error) => error);
        }
    }

    useIdleTimer({
        timeout: 1000 * 60 * SESSION_IDEL_MINUTES,
        onIdle: handleOnIdle,
        debounce: 500,
        crossTab: true,
        leaderElection: true,
        syncTimers: 1000 * 60
    });

  return null;
};

export default ManageIdleTime;