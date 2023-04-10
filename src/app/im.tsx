import React, {useState} from "react";
import styles from './app.module.scss';
import cnBind from "classnames/bind";
import {Button, Sidebar} from "shared/ui";

const cx = cnBind.bind(styles);

function Im() {
  const [isActive, setIsActive] = useState(false)
  return (
      <div className={cx('app')}>
        <div className={cx('container')}>
          <Sidebar
              className={cx('left-panel', {'left-panel--active': isActive})}
          >
            <Button
                className={cx('main__button')}
                disabled={false}
                text={'push me'}
                onClick={() => setIsActive(prevState => !prevState)}
            />
          </Sidebar>

          <main className={cx('main', {'main--active': isActive})}>
            <Button
                className={cx('main__button')}
                disabled={false}
                text={'push me'}
                onClick={() => setIsActive(prevState => !prevState)}
            />
            this is main page
          </main>
          <Sidebar className={cx('right-panel')}/>

        </div>
      </div>
  )
}

export default Im
