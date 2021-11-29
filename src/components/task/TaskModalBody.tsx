import React, { useEffect } from "react";
import { MdStar, MdToday } from "react-icons/md";
import { ITask } from "../../models/task.model";
import { useAppDispatch } from "../../store/configureStore";
import { toggleModal } from "../../store/modalSlice";
import { getStepsAsync } from "../../store/stepSlice";
import { updateTaskAsync } from "../../store/taskSlice";
import StepList from "./StepList";
import TaskTag from "../ui/TaskTag";
import UpsertTaskNoteForm from "./UpsertTaskNoteForm";
import {
  getUiPreferenceAsync,
  selectUiPreference,
} from "../../store/uiPreferenceSlice";
import { useMsal } from "@azure/msal-react";
import { useSelector } from "react-redux";

type Props = {
  task: ITask;
};
const TaskModalBody = ({ task }: Props) => {
  const dispatch = useAppDispatch();
  const { accounts } = useMsal();
  const account = accounts[0].username;
  const uiPreference = useSelector(selectUiPreference);

  const getList = async () =>
    await dispatch(getStepsAsync({ username: task.userId, taskId: task.id! }));
  const getUiPreference = async () =>
    await dispatch(getUiPreferenceAsync(account));

  const handleTagMyDay = async () => {
    if (task.completed) return;

    await dispatch(
      updateTaskAsync({
        ...task,
        myDayEndDate:
          task.myDayEndDate! <= Date.now() || task.myDayEndDate === undefined
            ? setMyDayDate(uiPreference?.myDayBaseTime)
            : undefined,
      })
    );
    dispatch(toggleModal());
  };

  const handleImportantTag = async () => {
    if (task.completed) return;
    await dispatch(updateTaskAsync({ ...task, important: !task.important }));
    dispatch(toggleModal());
  };

  const setMyDayDate = (baseTime?: number) => {
    const time = baseTime ? baseTime * 1000 * 60 * 60 : 14 * 1000 * 60 * 60;

    return (
      new Date().getTime() -
      new Date().getHours() * 1000 * 60 * 60 -
      new Date().getMinutes() * 1000 * 60 -
      new Date().getSeconds() * 1000 -
      new Date().getMilliseconds() +
      1000 * 60 * 60 * 24 + // Add one day
      time // set 2pm if baseTime is undefined
    );
  };

  useEffect(() => {
    getList();
    getUiPreference();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StepList task={task} />
      <TaskTag
        Icon={MdToday}
        name={`${
          task.myDayEndDate! >= Date.now() ? `Remove` : `Add`
        } to My day`}
        onClick={handleTagMyDay}
      />
      <TaskTag
        Icon={MdStar}
        name={`${task.important ? `Remove` : `Add`} to important`}
        onClick={handleImportantTag}
      />
      <UpsertTaskNoteForm task={task} />
    </>
  );
};

export default TaskModalBody;
