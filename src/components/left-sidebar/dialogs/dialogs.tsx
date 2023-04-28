import React, { FC } from 'react';
import cnBind from 'classnames/bind';
import styles from './dilogs.module.scss';
import { useAppSelector } from 'shared/hooks';
import { Dialog } from 'entities/dialog';
import { Preloader } from 'shared/ui';

const cx = cnBind.bind(styles);

export const Dialogs: FC = () => {
  const { dialogs, status } = useAppSelector(state => state.dialogSlice);

  dialogs.map(item => console.log(item.last_message_text));

  return (
    <ul className={cx('dialogs')}>
      {status === 'loading' ? (
        <Preloader className={cx('dialogs__preloader')} />
      ) : (
        dialogs.map(dialog => <Dialog key={dialog.id} {...dialog} />)
      )}
    </ul>
  );
};
