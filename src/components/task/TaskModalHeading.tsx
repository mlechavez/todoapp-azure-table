import React from "react";
import { useSelector } from "react-redux";
import { ITask } from "../../models/task.model";
import { useAppDispatch } from "../../store/configureStore";
import { toggleModal } from "../../store/modalSlice";
import { selectUncompletedStepsCount } from "../../store/stepSlice";
import { updateTaskAsync } from "../../store/taskSlice";
import CheckToggler from "../ui/CheckToggler";

type Props = {
  task: ITask;
};
const TaskModalHeading = ({ task }: Props) => {
  const dispatch = useAppDispatch();
  const uncompletedStepCount = useSelector(selectUncompletedStepsCount);

  const handleComplete = async () => {
    if (uncompletedStepCount) return;

    await dispatch(updateTaskAsync({ ...task, completed: !task.completed }));
    dispatch(toggleModal());
  };

  return (
    <>
      <h3>
        <CheckToggler complete={task.completed} onComplete={handleComplete} />{" "}
        {task.description}
      </h3>
    </>
  );
};

export default TaskModalHeading;
