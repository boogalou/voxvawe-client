import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import { Area, Point } from 'react-easy-crop/types';
import styles from './avatar-crop.module.scss';
import cnBind from 'classnames/bind';
import { Button, Content, Footer, Header, Input } from 'shared/ui';
import { getCroppedImage } from 'entities/user/lib/croped-image';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { updateUserImageAsync } from 'entities/user/api';

const cx = cnBind.bind(styles);

export interface IAvatarCropProps {
  avatarImg: string;
  handleCloseModal: () => void;
  clearSelectedFiles: () => void;
}

export const AvatarCrop: FC<IAvatarCropProps> = ({
  avatarImg,
  handleCloseModal,
  clearSelectedFiles,
}) => {
  const dispatch = useAppDispatch();

  const { account_id: accountId } = useAppSelector(state => state.userSlice.user);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppArea, setCroppArea] = useState<Area | null>(null);

  const zoomHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setZoom(Number(evt.target.value));
  };

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppArea(croppedAreaPixels);
    console.log(croppedArea, croppedAreaPixels);
  }, []);

  const acceptHandler = async () => {
    if (avatarImg && croppArea) {
      const imageData = await getCroppedImage(avatarImg, croppArea);
      dispatch(updateUserImageAsync({ id: accountId, file: imageData }));
      clearSelectedFiles();
      handleCloseModal();
    }
  };
  const cancelHandler = () => {
    clearSelectedFiles();
    handleCloseModal();
  };

  return (
    <div className={cx('cropping')}>
      <Content className={cx('cropping__content')}>
        <div className={cx('cropping__container')}>
          <Cropper
            classes={{
              containerClassName: cx('cropping__crop-container'),
            }}
            cropShape={'round'}
            image={avatarImg}
            crop={crop}
            zoom={zoom}
            aspect={4 / 4}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
      </Content>

      <Footer className={cx('cropping__footer')}>
        <div className={cx('cropping__controls')}>
          <div className={cx('cropping__slider-wrapper')}>
            <Input
              classNameInput={cx('cropping__slider')}
              type={'range'}
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={zoomHandler}
            />
          </div>
          <div className={cx('cropping__buttons')}>
            <Button
              className={cx('cropping__button', 'cropping__button--cancel')}
              onClick={cancelHandler}
            >
              {'Отмена'}
            </Button>

            <Button
              className={cx('cropping__button', 'cropping__button--apply')}
              onClick={acceptHandler}
            >
              {'Принять'}
            </Button>
          </div>
        </div>
      </Footer>
    </div>
  );
};
