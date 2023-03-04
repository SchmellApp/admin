import { useState } from "react";

const useModal = (): {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setIsOpen: (isOpen: boolean) => void;
} => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = (): void => setIsOpen(true);
  const onClose = (): void => setIsOpen(false);

  return { isOpen, onOpen, onClose, setIsOpen };
};

export default useModal;
