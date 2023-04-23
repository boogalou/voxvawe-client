import React, {FC} from 'react';
import styles from './dialog.module.scss';
import cnBind from 'classnames/bind';
import {Avatar, UnreadMsgBadge} from 'shared/ui';
import {moveFrontMiddleColumn, setSelectedDialogAction} from "@/entities";
import {useAppDispatch} from "@/shared";


export interface IMessage {
    id: number;
    userId: number;
    text: string;
    timestamp: string;
    isRead: boolean;
    isGroup: boolean;
    attachments: [];
}

export interface IDialog {
    id: number;
    userId: number;
    userPic: string;
    fullName: string;
    lastMsgDate: string;
    unreadCount: number;
    isOnline: boolean;
    messages: IMessage[];
}

const cx = cnBind.bind(styles);

export interface IDialogProps extends IDialog {
    selectedDialog: number | null;
    onClick: (id: number) => void;
}

export const Dialog: FC<IDialogProps> = (
    {
        userId,
        userPic,
        fullName,
        unreadCount,
        isOnline,
        lastMsgDate,
        messages,
        selectedDialog,
        onClick,

    }
) => {
    const dispatch = useAppDispatch();
    const onClickHandler = () => {
        onClick(userId);
        dispatch(setSelectedDialogAction(userId));
        dispatch(moveFrontMiddleColumn(true));
    }

    return (
        <li
            className={cx('dialog', {"dialog--selected": userId === selectedDialog})}
            onClick={onClickHandler}
        >

            <div className={cx("dialog__container")}>
                <div className={cx("dialog__avatar")}>
                    <Avatar avatarImg={userPic}/>
                </div>
                <div className={cx("dialog__name")}>{fullName}</div>
                <div className={cx("dialog__time-date")}>
                    {messages.filter(msg => msg.userId === userId).at(-1)?.timestamp}
                </div>
                <div className={cx("dialog__last-message")}>
                    {messages.filter(msg => msg.userId === userId).at(-1)?.text}
                </div>
                <div className={cx("dialog__unread-message")}>
                    <UnreadMsgBadge count={unreadCount}/>
                </div>
            </div>
        </li>
    );
};
