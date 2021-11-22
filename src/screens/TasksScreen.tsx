import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useMsal } from "@azure/msal-react";

import AddTaskForm from "../components/task/AddTaskForm";
import CompletedTaskList from "../components/task/CompletedTaskList";
import { Container, Section } from "../components/task/styles";
import OngoingTaskList from "../components/task/OngoingTaskList";

import { useAppDispatch } from "../store/configureStore";
import {
  getTasksAsync,
  selectCompletedTasks,
  selectOngoingTasks,
} from "../store/taskSlice";

const TasksScreen = () => {
  const dispatch = useAppDispatch();
  const onGoingTasks = useSelector(selectOngoingTasks);
  const completedTasks = useSelector(selectCompletedTasks);
  const { accounts } = useMsal();

  const getList = async () => {
    await dispatch(getTasksAsync(accounts[0].username));
  };

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
    >
      <Section>
        <OngoingTaskList tasks={onGoingTasks} />
        <CompletedTaskList tasks={completedTasks} />
      </Section>
      <Section>
        <AddTaskForm />
      </Section>
    </Container>
  );
};

export default TasksScreen;
