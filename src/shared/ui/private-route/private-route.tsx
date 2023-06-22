import { Navigate } from 'react-router-dom';
import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { checkExpireToken } from 'shared/lib';
import { checkAuthRequestAsync } from 'entities/auth';
import { Preloader } from 'shared/ui';

export interface IPrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute: FC<IPrivateRouteProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  const { isAuth, accessToken, isLoading } = useAppSelector(state => state.authSlice);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function fn() {
      if (!isAuth || checkExpireToken(accessToken)) {
        await dispatch(checkAuthRequestAsync());
      }
      setIsReady(true);
    }

    fn();
  }, [dispatch, isAuth, accessToken]);

  if (isLoading || !isReady) {
    return <Preloader />;
  }

  return isAuth ? children : <Navigate to="/auth/signin" />;
};
