import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms';

const useCheckLogin = () => {
  const [userLoginState, setUserLoginState] = useState(false);
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (user.length === 0) {
      setUserLoginState(false);
    } else {
      setUserLoginState(true);
    }
  }, []);

  return userLoginState;
};

export default useCheckLogin;
