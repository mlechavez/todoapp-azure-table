import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ITask } from "../../models/task.model";
import { useAppDispatch } from "../../store/configureStore";
import { toggleModal } from "../../store/modalSlice";
import { selectUncompletedStepsCount } from "../../store/stepSlice";
import { updateTaskAsync } from "../../store/taskSlice";
import CheckToggler from "../ui/CheckToggler";
import { ButtonContainer } from "./styles";

type Props = {
  task: ITask;
};
const TaskModalHeading = ({ task }: Props) => {
  const dispatch = useAppDispatch();
  const uncompletedStepCount = useSelector(selectUncompletedStepsCount);
  const [description, setDescription] = useState("");
  const [enableEditDescriptionMode, setEnableEditDescriptionMode] =
    useState(false);
  const inputDescriptionRef = useRef<HTMLInputElement>(null);

  const handleComplete = async () => {
    if (uncompletedStepCount) return;

    await dispatch(updateTaskAsync({ ...task, completed: !task.completed }));
    dispatch(toggleModal());
  };

  const handleEnableEditDescriptionMode = () => {
    setEnableEditDescriptionMode(!enableEditDescriptionMode);
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== " " && e.code === "Enter") {
      setEnableEditDescriptionMode((c) => !c);
      await dispatch(updateTaskAsync({ ...task, description }));
    }
  };

  useLayoutEffect(() => {
    if (inputDescriptionRef.current === null) return;

    const { current } = inputDescriptionRef;
    current?.focus();

    return () => {
      current?.removeEventListener("keypress", () => handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableEditDescriptionMode]);

  useEffect(() => {
    setDescription(task.description!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CheckToggler complete={task.completed} onComplete={handleComplete} />{" "}
      {!enableEditDescriptionMode && <h5>{task.description}</h5>}
      {enableEditDescriptionMode && (
        <input
          className="form-control"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
          onKeyPress={handleKeyPress}
          ref={inputDescriptionRef}
          value={description}
        />
      )}
      {!enableEditDescriptionMode && !task.completed && (
        <ButtonContainer
          onClick={handleEnableEditDescriptionMode}
          paddingLeft="0"
          paddingRight="0"
        >
          Edit
        </ButtonContainer>
      )}
    </>
  );
};

export default TaskModalHeading;
