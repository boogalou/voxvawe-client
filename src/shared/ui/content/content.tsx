import React, {FC} from 'react';
import cnBind from 'classnames/bind'
import styles from './content.module.scss';

const cx = cnBind.bind(styles);

export interface IContentProps {
  className?: string;
  children?: React.ReactNode
}

export const Content: FC<IContentProps> = ({children, className}) => {
  console.log('content: ',className);
  return (
      <section className={cx('content', className)}>
        {children}
      </section>
  );
};
