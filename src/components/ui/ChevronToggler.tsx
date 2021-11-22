import React from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Chevron } from "../task/styles";

type Props = {
  show: boolean;
  onToggle: () => void;
};
const ChevronToggler = ({ show, onToggle }: Props) => {
  return (
    <>
      <Chevron onClick={onToggle}>
        Completed {show && <MdKeyboardArrowDown size={20} />}{" "}
        {!show && <MdKeyboardArrowUp size={20} />}
      </Chevron>
    </>
  );
};

export default ChevronToggler;
