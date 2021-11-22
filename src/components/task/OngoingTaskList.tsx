import React from "react";

import { ITask } from "../../models/task.model";
import Item from "./Item";
import Modal from "../ui/Modal";
import TaskModalBody from "./TaskModalBody";
import { useAppDispatch } from "../../store/configureStore";
import { deleteTaskAsync, updateTaskAsync } from "../../store/taskSlice";
import DeleteTask from "./DeleteTask";
import TaskModalHeading from "./TaskModalHeading";
import {
  selectData,
  setModalData,
  setShowFooter,
  toggleModal,
} from "../../store/modalSlice";
import { useSelector } from "react-redux";
type Props = {
  tasks: ITask[];
};

const OngoingTaskList = ({ tasks }: Props) => {
  const dispatch = useAppDispatch();
  const modalData = useSelector(selectData);

  const handleShowDetails = (task: ITask) => {
    dispatch(setModalData(task));
    dispatch(toggleModal());
    dispatch(setShowFooter(true));
  };

  const handleDeleteTask = async (data: any) => {
    const task = { ...data } as ITask;
    dispatch(setModalData(null));
    dispatch(toggleModal());
    await dispatch(deleteTaskAsync(task.id!));
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
      {tasks.length > 0 &&
        tasks.map((task, index) => (
          <Item
            key={`${task.id}-${index}`}
            task={task}
            onShowDetails={() => handleShowDetails(task)}
            onComplete={() => handleComplete(task)}
            onTagImportant={() => handleTagImportant(task)}
          />
        ))}

      {tasks.length === 0 && (
        <h3 style={{ textAlign: "center", letterSpacing: "2px" }}>
          Start adding your tasks...
        </h3>
      )}

      <Modal
        heading={<TaskModalHeading task={modalData} />}
        body={<TaskModalBody task={modalData} />}
        title={modalData?.description}
        footer={<DeleteTask onClick={() => handleDeleteTask(modalData)} />}
      />
    </>
  );
};

export default OngoingTaskList;
