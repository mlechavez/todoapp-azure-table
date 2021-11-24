import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { IStep, ITask } from "../../models/task.model";
import { useAppDispatch } from "../../store/configureStore";
import {
  getStepsByIdAsync,
  selectCompletedStepsCountByTask,
  selectStepsCountByTask,
} from "../../store/taskSlice";
import CheckToggler from "../ui/CheckToggler";
import StarToggler from "../ui/StarToggler";
import { HorizontalCard, Text, Content } from "./styles";

type Props = {
  task: ITask | IStep;
  onShowDetails?: () => void;
  onComplete?: () => void;
  onTagImportant?: () => void;
};
const Item = ({ onShowDetails, onComplete, onTagImportant, task }: Props) => {
  const dispatch = useAppDispatch();

  const stepsCount = useSelector(selectStepsCountByTask(task.id));
  const completedStepsCount = useSelector(
    selectCompletedStepsCountByTask(task.id)
  );
  const showSteps =
    completedStepsCount !== undefined && stepsCount !== undefined;

  const getSteps = async () => {
    await dispatch(
      getStepsByIdAsync({ username: task.userId, taskId: task.id })
    );
  };

  useEffect(() => {
    getSteps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HorizontalCard>
      <Content>
        <CheckToggler complete={task.completed} onComplete={onComplete} />
      </Content>
      <Content flexGrow="1">
        <Content>
          <Text onClick={onShowDetails}>{task.description}</Text>
          {showSteps && (
            <small>
              {completedStepsCount}/{stepsCount} steps completed
            </small>
          )}
        </Content>
      </Content>
      <Content>
        <StarToggler onTagImportant={onTagImportant} task={task as ITask} />
      </Content>
    </HorizontalCard>
  );
};

export default Item;
