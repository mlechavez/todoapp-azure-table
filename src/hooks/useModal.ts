import { useState } from "react";

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [data, setData] = useState<any>({});

  const toggleModal = () => setShowModal(!showModal);

  const setTitle = (title: string) => setModalTitle(title);

  const setEntity = (arg: any) => setData(arg);
  return { showModal, toggleModal, modalTitle, setTitle, data, setEntity };
};
