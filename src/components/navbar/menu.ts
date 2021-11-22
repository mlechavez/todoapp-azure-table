import React from "react";
import { MdToday, MdTask, MdStar } from "react-icons/md";
type Menu = {
  Icon: (e?: any) => React.ReactNode;
  name: string;
  to: string;
};
export const menuList: Menu[] = [
  {
    Icon: () => MdToday({ size: 20 }),
    name: "My day",
    to: "/my-day",
  },
  {
    Icon: () => MdStar({ size: 20 }),
    name: "Important",
    to: "/important",
  },
  {
    Icon: () => MdTask({ size: 20 }),
    name: "Tasks",
    to: "/tasks",
  },
];
