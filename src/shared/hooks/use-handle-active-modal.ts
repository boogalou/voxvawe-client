import { useState } from "react";


export interface IUseModal {
  handleCloseModal: () => void;
  handleOpenModal: () => void;
  isOpen: boolean;
}

export const useHandleActiveModal = ():IUseModal => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  }

  const handleCloseModal = () => {
    setIsOpen(false);
  }


  return { isOpen, handleOpenModal, handleCloseModal }
}