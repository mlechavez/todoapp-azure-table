import React from "react";
import { MdStar } from "react-icons/md";
import { ITask } from "../../models/task.model";

type Props = {
  task: ITask;
  onTagImportant?: () => void;
};
const StarToggler = ({ task, onTagImportant }: Props) => {
  return (
    <MdStar
      size={20}
      onClick={onTagImportant}
      cursor="pointer"
      color={task.important ? "orange" : ""}
    />
  );
};

export default StarToggler;
