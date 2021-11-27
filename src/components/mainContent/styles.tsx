import styled from "styled-components";
import ItemWrapper from "../helpers/ItemWrapper";

export const Container = styled(ItemWrapper)`
  width: calc(100% - 280px);
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 280px;
  background-color: var(--main-color);
  color: var(--text-color);
  font-family: "Raleway", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

export const Backdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 500;
`;

export const ModalWrapper = styled(ItemWrapper)`
  background-color: var(--text-color);
  border: 1px solid lightgray;
  border-radius: 5px;
  box-shadow: rgba(255, 255, 255, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  color: var(--main-color);
  left: 50%;
  max-width: 960px;
  min-width: 500px;
  overflow: hidden;
  position: fixed;
  top: 30%;
  transform: translate(-50%, -50%);
  z-index: 700;
`;

export const ModalHeader = styled(ItemWrapper)`
  display: flex;
  border-bottom: 1px solid lightgray;
  gap: 10px;
  padding: 5px 15px;

  div:first-child {
    align-items: center;
    flex: 1 1 auto;
    display: flex;
    gap: 8px;
    h5,
    input {
      flex: 1 1 auto;
    }
  }
  .close {
    margin-top: 10px;
  }
`;

export const ModalBody = styled(ItemWrapper)``;

export const ModalFooter = styled(ItemWrapper)`
  padding: 15px;
  border-top: 1px solid lightgray;
`;
