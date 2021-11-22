import React from "react";
import { TagWrapper } from "../task/styles";

type Props = {
  Icon: (props: any) => JSX.Element;
  name: string;
  onClick: () => void;
};
const TaskTag = ({ Icon, name, onClick }: Props) => {
  return (
    <TagWrapper onClick={onClick}>
      {<Icon size={20} />}
      {name}
    </TagWrapper>
  );
};

export default TaskTag;
