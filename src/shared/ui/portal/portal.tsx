import React, { FC } from "react";
import  {createPortal}  from "react-dom";


const root =  document.getElementById('modals')!

export interface PortalProps {
  className?: string;
  children?: React.ReactNode;
  element?: keyof JSX.IntrinsicElements;
}
export const Portal: FC<PortalProps> = ({className,children, element: Element = 'div'}) => {

  return root ? (
    <>
      {
        createPortal(
          <Element>
            {children}
          </Element>,
        root
        )
      }
    </>
  ) : null;


};
