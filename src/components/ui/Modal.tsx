import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import ReactFocusLock from "react-focus-lock";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/configureStore";
import {
  selectShowFooter,
  selectShowModal,
  toggleModal,
} from "../../store/modalSlice";
import {
  Backdrop,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalWrapper,
} from "../mainContent/styles";

type Props = {
  body: React.ReactNode;
  footer?: React.ReactNode;
  heading: React.ReactNode;
  title: string;
};
const Modal = ({ body, footer, heading, title }: Props) => {
  const dispatch = useAppDispatch();
  const show = useSelector(selectShowModal);
  const showFooter = useSelector(selectShowFooter);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Escape" && show) dispatch(toggleModal());
  };

  useEffect(() => {
    show
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");

    document.addEventListener("keydown", handleKeyDown, false);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const modal = (
    <>
      <Backdrop onClick={() => dispatch(toggleModal())} />
      <ReactFocusLock>
        <ModalWrapper
          role="dialog"
          aria-modal
          aria-labelledby={title}
          tabIndex={-1}
        >
          <ModalHeader>
            <div>{heading}</div>
            <MdClose
              onClick={() => dispatch(toggleModal())}
              className="close"
              cursor="pointer"
              aria-hidden
            />
          </ModalHeader>
          <ModalBody>{body}</ModalBody>
          {showFooter && <ModalFooter>{footer}</ModalFooter>}
        </ModalWrapper>
      </ReactFocusLock>
    </>
  );
  return show ? ReactDOM.createPortal(modal, document.body) : null;
};

export default Modal;
