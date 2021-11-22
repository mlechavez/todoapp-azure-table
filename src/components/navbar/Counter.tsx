import React from "react";
import { useSelector } from "react-redux";
import {
  selectImportantTasksCount,
  selectMyDayTasksCount,
} from "../../store/taskSlice";
import { CounterText } from "./styles";

type Props = {
  name: string;
};
const Counter = ({ name }: Props) => {
  const myDayTasksCount = useSelector(selectMyDayTasksCount);
  const importantTasksCount = useSelector(selectImportantTasksCount);
  let count = 0;

  switch (name) {
    case "My day":
      count = myDayTasksCount;
      break;
    case "Important":
      count = importantTasksCount;
      break;
    default:
      count = -1;
      break;
  }

  if (count <= 0) return null;

  return <CounterText tagElement="span">{count}</CounterText>;
};

export default Counter;
