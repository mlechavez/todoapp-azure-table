import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState } from "./configureStore";

const initialState: ModalState = {
  showModal: false,
  data: null,
  showFooter: false,
};

const slice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state: ModalState) => {
      state.showModal = !state.showModal;
    },
    setModalData: (state: ModalState, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setShowFooter: (state: ModalState, action: PayloadAction<boolean>) => {
      state.showFooter = action.payload;
    },
  },
});

export const { toggleModal, setModalData, setShowFooter } = slice.actions;
export default slice.reducer;

interface ModalState {
  showModal: boolean;
  data: any;
  showFooter: boolean;
}

const modalSelector = (state: AppState) => state.modal;

export const selectShowModal = createSelector(
  [modalSelector],
  (state) => state.showModal
);

export const selectData = createSelector(
  [modalSelector],
  (state) => state.data
);

export const selectShowFooter = createSelector(
  [modalSelector],
  (state) => state.showFooter
);
