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

  const onlineIds = contacts
    .filter(contact => contact.is_online)
    .map(contact => contact.account_id);


  const modifiedDialogs = dialogs.map(dialog => {
    const isAnyMemberOnline = dialog.members.some(member => onlineIds.includes(member.account_id));

    return {
      ...dialog,
      is_online: isAnyMemberOnline,
    };
  });

  return (
    <ul className={ cx('dialogs') }>
      {status === 'loading' ? (
        <Preloader className={cx('dialogs__preloader')} />
      ) : (
        modifiedDialogs.map(dialog => <Dialog key={dialog.id} {...dialog} />)
      )}
    </ul>
  );
};
