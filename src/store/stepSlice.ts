import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IStep } from "../models/task.model";
import stepService from "../services/stepService";
import { AppState } from "./configureStore";

export const createStepAsync = createAsyncThunk(
  "step/createStepAsync",
  async (payload: IStep, { rejectWithValue }) => {
    try {
      const response = await stepService.createStepAsync(payload);
      const createdStep = { ...payload };
      createdStep.id = response.subResponses[0].rowKey!;
      return createdStep;
    } catch (error) {
      return rejectWithValue({ error });
    }
  }
);

export const getStepsAsync = createAsyncThunk(
  "step/getStepsAsync",
  async (payload: { username: string; taskId: string }) => {
    const entityList = stepService.getStepsAsync(
      payload.username,
      payload.taskId
    );
    return entityList;
  }
);

export const updateStepsAsync = createAsyncThunk(
  "step/updateStepAsync",
  async (payload: IStep, { rejectWithValue }) => {
    try {
      const response = await stepService.updateStepAsync(payload);

      if (typeof response === typeof Error) console.log("yes typeof error");
    } catch (error) {
      return rejectWithValue({ error });
    }
    return payload;
  }
);

export const deleteStepAsync = createAsyncThunk(
  "step/deleteStepAsync",
  async (payload: string, { rejectWithValue }) => {
    try {
      await stepService.deleteStepAsync(payload);
    } catch (error) {
      return rejectWithValue({ error });
    }
    return payload;
  }
);

const initialState: StepState = {
  loading: false,
  steps: [],
  error: "",
};

const slice = createSlice({
  name: "step",
  initialState,
  reducers: {},
  extraReducers: {
    [createStepAsync.pending.toString()]: (state: StepState) => {
      state.loading = true;
      state.error = "";
    },
    [createStepAsync.fulfilled.toString()]: (
      state: StepState,
      action: PayloadAction<IStep>
    ) => {
      state.loading = true;
      state.error = "";
      state.steps.push(action.payload);
    },
    [createStepAsync.rejected.toString()]: (
      state: StepState,
      action: PayloadAction<any>
    ) => {
      state.loading = true;
      state.error = action.payload.error.message;
    },
    [getStepsAsync.pending.toString()]: (state: StepState) => {
      state.loading = true;
      state.error = "";
      state.steps = [];
    },
    [getStepsAsync.fulfilled.toString()]: (
      state: StepState,
      action: PayloadAction<IStep[]>
    ) => {
      state.loading = false;
      state.steps = action.payload;
      state.error = "";
    },
    [getStepsAsync.rejected.toString()]: (
      state: StepState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
      state.steps = [];
    },
    [updateStepsAsync.pending.toString()]: (state: StepState) => {
      state.loading = true;
      state.error = "";
    },
    [updateStepsAsync.fulfilled.toString()]: (
      state: StepState,
      action: PayloadAction<IStep>
    ) => {
      state.loading = false;
      state.error = "";

      const index = state.steps.findIndex(
        (step) => step.id === action.payload.id
      );

      if (index < 0) return;

      state.steps[index].id = action.payload.id;
      state.steps[index].type = action.payload.type;
      state.steps[index].taskId = action.payload.taskId;
      state.steps[index].description = action.payload.description;
      state.steps[index].completed = action.payload.completed;
    },
    [updateStepsAsync.rejected.toString()]: (
      state: StepState,
      action: PayloadAction<any>
    ) => {
      state.loading = true;
      state.error = action.payload.error?.message;
    },
    [deleteStepAsync.pending.toString()]: (state: StepState) => {
      state.loading = true;
      state.error = "";
    },
    [deleteStepAsync.fulfilled.toString()]: (
      state: StepState,
      action: PayloadAction<string>
    ) => {
      state.loading = true;
      state.error = "";
      state.steps = state.steps.filter((step) => step.id !== action.payload);
    },
    [deleteStepAsync.rejected.toString()]: (
      state: StepState,
      action: PayloadAction<any>
    ) => {
      state.loading = true;
      state.error = action.payload.error.message;
    },
  },
});

export default slice.reducer;

interface StepState {
  loading: boolean;
  steps: IStep[];
  error: string;
}

const stepSelector = (state: AppState) => state.steps;

export const selectSteps = createSelector(
  [stepSelector],
  (state: StepState) => state.steps
);

export const selectUncompletedStepsCount = createSelector(
  [stepSelector],
  (state: StepState) => state.steps.filter((step) => !step.completed).length
);
