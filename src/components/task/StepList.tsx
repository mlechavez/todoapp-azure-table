import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useSelector } from "react-redux";
import { IStep, ITask } from "../../models/task.model";
import { selectSteps } from "../../store/stepSlice";
import UpsertStepForm from "./UpsertStepForm";
import { ButtonContainer } from "./styles";

type Props = {
  task: ITask;
};
const StepList = ({ task }: Props) => {
  const steps = useSelector(selectSteps);
  const [currentSteps, setCurrentSteps] = useState<IStep[]>([]);

  useEffect(() => {
    setCurrentSteps(steps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps]);

  const handleAdd = () => {
    if (task.completed) return;

    const existingEmptyStep = currentSteps.filter((step) => step.id === "");
    if (existingEmptyStep.length) return;

    setCurrentSteps([
      ...currentSteps,
      {
        id: "",
        userId: task.userId,
        type: "step",
        description: "",
        completed: false,
        taskId: task.id!,
      },
    ]);
  };

  return (
    <>
      <ButtonContainer onClick={handleAdd}>
        <MdAdd /> Add step
      </ButtonContainer>

      {currentSteps.map((step) => (
        <UpsertStepForm
          key={step.id}
          step={step}
          currentSteps={currentSteps}
          setCurrentSteps={setCurrentSteps}
          task={task}
        />
      ))}
    </>
  );
};

export default StepList;
