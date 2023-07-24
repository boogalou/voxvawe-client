import { Navigate } from 'react-router-dom';
import React, { FC } from 'react';
import { useAppSelector } from 'shared/hooks';

export interface AuthorizedRouteProps {
  children: JSX.Element;
}

export const AuthorizedRoute: FC<AuthorizedRouteProps> = ({ children }) => {
  const { isAuth } = useAppSelector(state => state.authSlice);
  return isAuth ? <Navigate to="/" /> : children;
};
