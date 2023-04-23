import React, {useEffect, useState} from "react";
import cnBind from "classnames/bind";
import styles from './im.module.scss';
import {Dialogs, dialogsFetchThunk} from "@/entities/dialog";
import {Button, Header, Sidebar} from "shared/ui";
import {useAppDispatch, useAppSelector} from "@/shared/hooks";
import {Search} from "@/features/search";
import {MainMenu} from "@/widgets";
import {Chat} from "@/widgets/chat";


const cx = cnBind.bind(styles);


export const Im = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(dialogsFetchThunk())
  }, [])

 const { isOpen } = useAppSelector(state => state.dialogSlice)
  console.log(isOpen)
  console.log('IM rerender')
  return (
      <div className={cx('im')}>
        <Sidebar className={cx('left-panel', {'left-panel--active': isOpen })}>
          <Header className={cx('left-panel__header')}>
            <MainMenu/>
            <Search/>
          </Header>
          <Dialogs />
        </Sidebar>

        <main className={cx('main', {'main--active': isOpen, 'main--close': !isOpen})}>
          <Chat />
        </main>

        <Sidebar className={cx('right-panel', {'right-panel--active': false })}>

        </Sidebar>
      </div>
  )
}


