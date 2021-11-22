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

type Props = {
  task: ITask;
};
const TaskModalBody = ({ task }: Props) => {
  const dispatch = useAppDispatch();

  const getList = async () => {
    await dispatch(getStepsAsync({ username: task.userId, taskId: task.id! }));
  };

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTagMyDay = async () => {
    if (task.completed) return;
    await dispatch(updateTaskAsync({ ...task, myDay: !task.myDay }));
    dispatch(toggleModal());
  };

  const handleImportantTag = async () => {
    if (task.completed) return;
    await dispatch(updateTaskAsync({ ...task, important: !task.important }));
    dispatch(toggleModal());
  };

  return (
    <>
      <StepList task={task} />
      <TaskTag
        Icon={MdToday}
        name={`${task.myDay ? `Remove` : `Add`} to My day`}
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
