import React from "react";
import { MdRadioButtonUnchecked, MdTaskAlt } from "react-icons/md";

type Props = {
  complete: boolean | undefined;
  onComplete?: () => void;
};
const CheckToggler = ({ complete, onComplete }: Props) => {
  if (!complete)
    return (
      <MdRadioButtonUnchecked
        color="black"
        size={20}
        cursor="pointer"
        onClick={onComplete}
      />
    );
  return (
    <MdTaskAlt color="green" size={20} cursor="pointer" onClick={onComplete} />
  );
};

export default CheckToggler;
