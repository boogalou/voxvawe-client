import { FC } from "react";
import cnBind from "classnames/bind";
import styles from './CurrentChatInfo.module.scss';
import { Avatar } from "shared/ui-kit";
import { Link } from "react-router-dom";
import {IDialog} from "../../types/Dialog.interface";

const cx = cnBind.bind(styles);

export interface ActiveDialogProps extends IDialog{}

export const CurrentChatInfo: FC<ActiveDialogProps> = ({ userPic, fullName, lastMsgDate }: ActiveDialogProps) => {
  return (
      <div className={cx('active-dialog')}>
        <Link to={""} className={cx('active-dialog__link')} >

          <div className={cx('active-dialog__avatar')}>
            <Avatar
                avatarImg={'https://images.unsplash.com/photo-1671531009361-8846ff0d7ae4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80'}/>
          </div>
          <div className={cx('active-dialog__info')}>
            <div className={cx('active-dialog__name')}>{'Наташа'}</div>
            <div className={cx('active-dialog__timestamp')}>{'был(а) 54 минты назад'}</div>
          </div>
        </Link>
      </div>
  );
};
