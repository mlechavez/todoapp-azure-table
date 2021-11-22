import React from "react";
import { MdDelete } from "react-icons/md";

type Props = {
  onClick: () => void;
};
const DeleteTask = ({ onClick }: Props) => {
  return (
    <div
      style={{ color: "red", display: "flex", gap: 15, alignItems: "center" }}
    >
      <MdDelete cursor="pointer" onClick={onClick} size={20} />
      <span>Deleting a task cannot be undone.</span>
    </div>
  );
};

export default DeleteTask;
