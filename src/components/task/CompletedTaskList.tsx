import { useState } from "react";

import { ITask } from "../../models/task.model";
import { useAppDispatch } from "../../store/configureStore";
import { updateTaskAsync } from "../../store/taskSlice";
import ChevronToggler from "../ui/ChevronToggler";
import Item from "./Item";
import {
  setModalData,
  setShowFooter,
  toggleModal,
} from "../../store/modalSlice";

type Props = {
  tasks: ITask[];
};

const CompletedTaskList = ({ tasks }: Props) => {
  const dispatch = useAppDispatch();
  const [showCompleted, setShowCompleted] = useState(true);

  const handleShowDetails = (task: ITask) => {
    dispatch(setModalData(task));
    dispatch(toggleModal());
    dispatch(setShowFooter(false));
  };

  const handleComplete = async (task: ITask) => {
    await dispatch(updateTaskAsync({ ...task, completed: !task.completed }));
  };

  const handleTagImportant = async (task: ITask) => {
    if (task.completed) return;
    await dispatch(updateTaskAsync({ ...task, important: !task.important }));
  };

  return (
    <>
      {tasks.length > 0 && (
        <ChevronToggler
          show={showCompleted}
          onToggle={() => setShowCompleted(!showCompleted)}
        />
      )}

      {showCompleted &&
        tasks.map((task, index) => (
          <Item
            key={`${task.id}-${index}`}
            task={task}
            onShowDetails={() => handleShowDetails(task)}
            onComplete={() => handleComplete(task)}
            onTagImportant={() => handleTagImportant(task)}
          />
        ))}
    </>
  );
};

export default CompletedTaskList;
