import React, {useEffect, useState} from "react";
import cnBind from "classnames/bind";
import styles from './im.module.scss';
import {Dialogs, dialogsFetchThunk} from "@/entities/dialog";
import {Button, Header, Sidebar} from "@/shared/ui";
import {useAppDispatch} from "@/shared/hooks";
import {Search} from "@/features/search";
import {MainMenu} from "@/features/main-menu/main-menu";
import {ChatBox} from "@/entities/message/ui/chat-box/chat-box";


const cx = cnBind.bind(styles);


export const Im = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(dialogsFetchThunk())
  })

  const [openChat, setIsActive] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  console.log('IM rerender')
  return (
      <div className={cx('im' , 'dark-theme')}>
        <div className={cx('container')}>
          <Sidebar className={cx('left-panel', {'left-panel--active': openChat})}>
            <Header className={cx('left-panel__header')}>
              <MainMenu/>
              <Search/>
            </Header>
            <Dialogs/>
          </Sidebar>

          <main className={cx('main', {'main--active': openChat, 'main--close': !openChat})}>
            <Header className={cx('main__header')}>

            </Header>
            <ChatBox/>
          </main>

          <Sidebar className={cx('right-panel', {'right-panel--active': openInfo})}>
            <Button
                className={cx('main__button')}
                disabled={false}
                text={'back <--'}
                onClick={() => setOpenInfo(prevState => !prevState)}
            />
          </Sidebar>

        </div>
      </div>
  )
}


