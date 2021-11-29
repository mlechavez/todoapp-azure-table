import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IUIPreference } from "../models/ui.model";
import uiPreferenceService from "../services/uiPreferenceService";
import { AppState } from "./configureStore";

export const getUiPreferenceAsync = createAsyncThunk(
  "uiPreference/getUiPreferenceAsync",
  async (payload: string, { rejectWithValue }) => {
    const response: any = await uiPreferenceService.getUiPreferenceAsync(
      payload
    );
    if (response && response.hasError && response.statusCode > 400)
      return rejectWithValue(response.message);
    return {
      userId: response.userId,
      showCompletedTasks: response.showCompletedTasks,
    };
  }
);
export const setUiPreferenceAsync = createAsyncThunk(
  "uiPreference/setUIPreferenceAsync",
  async (payload: IUIPreference, { rejectWithValue }) => {
    const response: any =
      await uiPreferenceService.updateUIPreferenceTasksAsync(payload);
    if (response && response.hasError) return rejectWithValue(response.message);
    return payload;
  }
);
interface UiPreferenceState {
  loading: boolean;
  uiPreference: IUIPreference | null;
  error: string;
}

const initialState: UiPreferenceState = {
  loading: false,
  uiPreference: null,
  error: "",
};
const slice = createSlice({
  name: "uiPreference",
  initialState,
  reducers: {},
  extraReducers: {
    [setUiPreferenceAsync.pending.toString()]: (state: UiPreferenceState) => {
      state.loading = true;
      state.uiPreference = null;
      state.error = "";
    },
    [setUiPreferenceAsync.fulfilled.toString()]: (
      state: UiPreferenceState,
      action: PayloadAction<IUIPreference>
    ) => {
      state.loading = false;
      state.uiPreference = action.payload;
      state.error = "";
    },
    [setUiPreferenceAsync.rejected.toString()]: (
      state: UiPreferenceState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getUiPreferenceAsync.pending.toString()]: (state: UiPreferenceState) => {
      state.loading = true;
      state.uiPreference = null;
      state.error = "";
    },
    [getUiPreferenceAsync.fulfilled.toString()]: (
      state: UiPreferenceState,
      action: PayloadAction<IUIPreference>
    ) => {
      state.loading = true;
      state.uiPreference = action.payload;
      state.error = "";
    },
    [getUiPreferenceAsync.pending.toString()]: (
      state: UiPreferenceState,
      action: PayloadAction<string>
    ) => {
      state.loading = true;
      state.uiPreference = null;
      state.error = action.payload;
    },
  },
});

export default slice.reducer;

const UiPreferenceSelector = (state: AppState) => state.uiPreference;

export const selectUiPreference = createSelector(
  [UiPreferenceSelector],
  (state: UiPreferenceState) => state.uiPreference
);
