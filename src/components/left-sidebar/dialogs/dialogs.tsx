import React, { FC } from 'react';
import cnBind from 'classnames/bind';
import styles from './dilogs.module.scss';
import { useAppSelector } from 'shared/hooks';
import { Dialog } from 'entities/dialog';
import { Preloader } from 'shared/ui';

const cx = cnBind.bind(styles);

export const Dialogs: FC = () => {
  const { dialogs, status } = useAppSelector(state => state.dialogSlice);
  const { contacts } = useAppSelector(state => state.contactsSlice);

  const modifiedDialogs = dialogs.map((dialog, index) => {
    if (dialog.accountId && contacts[index]?.accountId)
      if (dialog.accountId === contacts[index]?.accountId) {
        dialog = {
          ...dialog,
          isOnline: contacts[index].isOnline,
        };
      }
    return dialog;
  });

  return (
    <ul className={cx('dialogs')}>
      {status === 'loading' ? (
        <Preloader className={cx('dialogs__preloader')} />
      ) : (
        modifiedDialogs.map(dialog => <Dialog key={dialog.id} {...dialog} />)
      )}
    </ul>
  );
};
