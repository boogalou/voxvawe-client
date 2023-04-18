import React, {FC, useState} from 'react';
import cnBind from "classnames/bind";
import styles from "./dilogs.module.scss";

import {Dialog} from "entities/dialog";
import {useAppSelector} from "shared/hooks";

const cx = cnBind.bind(styles);

export const Dialogs: FC = () => {



  const [selected, setSelected] = useState<number | null>(null);

  const selectDialogHandler = (id: number) => {
    setSelected(id)
  }

  const dialogs = useAppSelector(state => state.dialogSlice.dialogs);

  return (
      <ul className={cx('dialogs')}>
        {
          dialogs.map(dialog => (
                  <Dialog
                      key={dialog.id}
                      selectedId={selected}
                      onClick={selectDialogHandler}
                      {...dialog}
                  />
              )
          )
        }
      </ul>
  );
};
