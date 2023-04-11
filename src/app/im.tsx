import React, {useState} from "react";
import styles from './app.module.scss';
import cnBind from "classnames/bind";
import {Button, Sidebar} from "shared/ui";

const cx = cnBind.bind(styles);

function Im() {
  const [openChat, setIsActive] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  console.log('IM rerender')
  return (
      <div className={cx('app')}>
        <div className={cx('container')}>

          <Sidebar
              className={cx('left-panel')}
          >
            {console.log('left-panel rerender')}
            <Button
                className={cx('main__button')}
                disabled={false}
                text={'open chat'}
                onClick={() => setIsActive(prevState => !prevState)}
            />
          </Sidebar>

          <main className={cx('main', {'main--active': openChat}, {'main--close': openInfo})}>
            {console.log('main rerender')}
            <Button
                className={cx('main__button')}
                disabled={false}
                text={'back <--'}
                onClick={() => setIsActive(prevState => !prevState)}
            />
            <Button
                className={cx('main__button')}
                disabled={false}
                text={'open info'}
                onClick={() => setOpenInfo(prevState => !prevState)}
            />

            this is chat window
          </main>

          <Sidebar className={cx('right-panel', {'right-panel--active': openInfo})}>
            {console.log('right-panel rerender')}
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

export default Im
