import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useMsal } from "@azure/msal-react";

import CompletedTaskList from "../components/task/CompletedTaskList";
import { Container, Section } from "../components/task/styles";
import OngoingTaskList from "../components/task/OngoingTaskList";

import { useAppDispatch } from "../store/configureStore";
import {
  getTasksAsync,
  selectCompletedMydayTasks,
  selectMydayTasks,
} from "../store/taskSlice";

const MydayScreen = () => {
  const dispatch = useAppDispatch();
  const onGoingTasks = useSelector(selectMydayTasks);
  const completedTasks = useSelector(selectCompletedMydayTasks);
  const { accounts } = useMsal();

  const getList = async () => {
    await dispatch(getTasksAsync(accounts[0].username));
  };

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container display="flex" flexDirection="column" paddingTop={30}>
      <Section>
        <OngoingTaskList tasks={onGoingTasks} />
        <CompletedTaskList tasks={completedTasks} />
      </Section>
    </Container>
  );
};

export default MydayScreen;
