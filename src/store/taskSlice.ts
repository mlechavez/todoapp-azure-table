import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IStep, ITask } from "../models/task.model";
import taskService from "../services/taskService";
import { AppState } from "./configureStore";
import { setModalData } from "./modalSlice";

export const createTaskAsync = createAsyncThunk(
  "task/createTaskAsync",
  async (payload: ITask, { rejectWithValue }) => {
    try {
      const response = await taskService.createTaskAsync(payload);

      if (response && response?.status > 400)
        return `There's an error adding a task`;

      const createdTask = { ...payload };
      createdTask.id = response?.subResponses[0].rowKey!;
      return createdTask;
    } catch (error) {
      return rejectWithValue({ error });
    }
  }
);

export const getTasksAsync = createAsyncThunk(
  "task/getTasksAsync",
  async (username: string, { rejectWithValue }) => {
    const entityList = taskService.getTasks(username);

    const items: ITask[] = [];

    try {
      for await (const task of entityList) {
        items.push({
          id: task.rowKey!,
          userId: task.userId,
          type: task.type,
          description: task.description,
          completed: task.completed,
          myDay: task.myDay,
          important: task.important,
        });
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.parsedBody?.odataError?.message?.value
      );
    }
    return items;
  }
);
export const deleteTaskAsync = createAsyncThunk(
  "task/deleteTaskAsync",
  async (payload: string, { dispatch, rejectWithValue }) => {
    try {
      await taskService.deleteTaskAsync(payload);
      dispatch(setModalData(null));
    } catch (error) {
      return rejectWithValue({ error });
    }
    return payload;
  }
);

export const updateTaskAsync = createAsyncThunk(
  "task/updateTaskAsync",
  async (payload: ITask, { dispatch, rejectWithValue }) => {
    try {
      await taskService.updateTaskAsync(payload);
      dispatch(setModalData(payload));
      return payload;
    } catch (error) {}
  }
);

export const getStepsByIdAsync = createAsyncThunk(
  "step/getStepsByIdAsync",
  async (payload: { username: string; taskId: string }) => {
    const entityList = taskService.getStepsByIdAsync(
      payload.username,
      payload.taskId
    );

    const items: IStep[] = [];

    for await (const step of entityList) {
      items.push({
        id: step.rowKey!,
        userId: step.userId,
        type: step.type,
        description: step.description,
        completed: step.completed,
        taskId: step.taskId,
      });
    }
    return items;
  }
);

interface TaskState {
  loading: boolean;
  tasks: ITask[];
  error: string;
}

const initialState: TaskState = {
  loading: false,
  tasks: [],
  error: "",
};

const slice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: {
    [createTaskAsync.pending.toString()]: (state: TaskState) => {
      state.loading = true;
      state.error = "";
    },
    [createTaskAsync.fulfilled.toString()]: (
      state: TaskState,
      action: PayloadAction<ITask>
    ) => {
      state.loading = false;
      state.error = "";
      state.tasks.push(action.payload);
    },
    [createTaskAsync.rejected.toString()]: (
      state: TaskState,
      action: PayloadAction<any>
    ) => {
      state.loading = false;
      state.error = action.payload?.error?.message;
    },
    [getTasksAsync.pending.toString()]: (state: TaskState) => {
      state.loading = true;
      state.error = "";
      state.tasks = [];
    },
    [getTasksAsync.fulfilled.toString()]: (
      state: TaskState,
      action: PayloadAction<ITask[]>
    ) => {
      state.loading = false;
      state.error = "";
      state.tasks = action.payload;
    },
    [getTasksAsync.rejected.toString()]: (
      state: TaskState,
      action: PayloadAction<any>
    ) => {
      state.loading = false;
      state.error = action.payload;
      // action.payload?.response?.parsedBody?.odataError?.message?.value;
    },
    [deleteTaskAsync.pending.toString()]: (state: TaskState) => {
      state.loading = true;
      state.error = "";
    },
    [deleteTaskAsync.fulfilled.toString()]: (
      state: TaskState,
      action: PayloadAction<string>
    ) => {
      state.loading = true;
      state.error = "";
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    [deleteTaskAsync.rejected.toString()]: (
      state: TaskState,
      action: PayloadAction<any>
    ) => {
      state.loading = false;
      state.error = action.payload?.error?.message;
    },
    [updateTaskAsync.pending.toString()]: (state: TaskState) => {
      state.loading = true;
      state.error = "";
    },
    [updateTaskAsync.fulfilled.toString()]: (
      state: TaskState,
      action: PayloadAction<ITask>
    ) => {
      state.loading = false;
      state.error = "";
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index < 0) return;
      state.tasks[index].id = action.payload.id;
      state.tasks[index].type = action.payload.type;
      state.tasks[index].description = action.payload.description;
      state.tasks[index].completed = action.payload.completed;
      state.tasks[index].myDay = action.payload.myDay;
      state.tasks[index].important = action.payload.important;
      state.tasks[index].note = action.payload.note;
    },
    [updateTaskAsync.rejected.toString()]: (
      state: TaskState,
      action: PayloadAction<any>
    ) => {
      state.loading = false;
      state.error = action.payload?.error?.message;
    },
    [getStepsByIdAsync.pending.toString()]: (state: TaskState) => {
      state.loading = true;
      state.error = "";
    },
    [getStepsByIdAsync.fulfilled.toString()]: (
      state: TaskState,
      action: PayloadAction<IStep[]>
    ) => {
      state.loading = false;
      state.error = "";
      if (action.payload.length > 0) {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload[0].taskId
        );
        if (index < 0) return;
        state.tasks[index].steps = action.payload;
      }
    },
    [getStepsByIdAsync.rejected.toString()]: (
      state: TaskState,
      action: PayloadAction<any>
    ) => {
      state.loading = false;
      state.error = action.payload?.error?.message;
    },
  },
});

export default slice.reducer;

const tasksSelector = (state: AppState) => state.tasks;

export const selectOngoingTasks = createSelector(
  [tasksSelector],
  (state: TaskState) => state.tasks.filter((task) => !task.completed)
);

export const selectCompletedTasks = createSelector(
  [tasksSelector],
  (state: TaskState) => state.tasks.filter((task) => task.completed)
);
export const selectMydayTasks = createSelector(
  [tasksSelector],
  (state: TaskState) =>
    state.tasks.filter((task) => task.myDay && !task.completed)
);
export const selectCompletedMydayTasks = createSelector(
  [tasksSelector],
  (state: TaskState) =>
    state.tasks.filter((task) => task.myDay && task.completed)
);
export const selectImportantTasks = createSelector(
  [tasksSelector],
  (state: TaskState) =>
    state.tasks.filter((task) => task.important && !task.completed)
);
export const selectCompletedImportantTasks = createSelector(
  [tasksSelector],
  (state: TaskState) =>
    state.tasks.filter((task) => task.important && task.completed)
);
export const selectMyDayTasksCount = createSelector(
  [tasksSelector],
  (state: TaskState) =>
    state.tasks.filter((task) => task.myDay && !task.completed).length
);

export const selectImportantTasksCount = createSelector(
  [tasksSelector],
  (state: TaskState) =>
    state.tasks.filter((task) => task.important && !task.completed).length
);

export const selectStepsCountByTask = (id: string) =>
  createSelector([tasksSelector], (state: TaskState) => {
    const index = state.tasks.findIndex((task) => task.id === id);
    if (index < 0) return;
    return state.tasks[index].steps?.length;
  });
export const selectCompletedStepsCountByTask = (id: string) =>
  createSelector([tasksSelector], (state: TaskState) => {
    const index = state.tasks.findIndex((task) => task.id === id);
    if (index < 0) return;
    return state.tasks[index].steps?.filter((step) => step.completed).length;
  });
