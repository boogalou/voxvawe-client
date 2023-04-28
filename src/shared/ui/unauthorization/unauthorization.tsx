import {Navigate} from "react-router-dom";
import React, {FC} from "react";


export interface UnauthorizationProps {
  children: JSX.Element;
}

export const Unauthorization: FC<UnauthorizationProps> = ({children}) => {
  const isAuth = localStorage.getItem('token');
  return (
      isAuth ? <Navigate to='/im'/> : children
  );
};