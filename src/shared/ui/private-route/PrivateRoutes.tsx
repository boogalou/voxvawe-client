import {Navigate} from "react-router-dom";
import React, {FC} from "react";


export interface PrivateRoutes {
  children: JSX.Element;
}

export const PrivateRoutes: FC<PrivateRoutes> = ({ children }) => {
  const isAuth = localStorage.getItem('token');
  return (
      isAuth ? children: <Navigate to='/auth/signin'/>
  );
};