import React from "react";
import * as yup from "yup";
import { FormikHelpers } from "formik";
import { MdClose } from "react-icons/md";

import { IStep } from "../../models/task.model";
import { useAppDispatch } from "../../store/configureStore";
import FormInput from "../forms/FormInput";
import Form from "../forms/Form";
import { Content, HorizontalCard } from "./styles";
import CheckToggler from "../ui/CheckToggler";
import {
  createStepAsync,
  deleteStepAsync,
  updateStepsAsync,
} from "../../store/stepSlice";
import { getStepsByIdAsync } from "../../store/taskSlice";
import { ITask } from "../../models/task.model";

const schema = yup.object().shape({
  description: yup.string().required().min(3).label("Description"),
});

type Props = {
  step: IStep;
  currentSteps: IStep[];
  setCurrentSteps: React.Dispatch<React.SetStateAction<IStep[]>>;
  task: ITask;
};
const UpsertStepForm = ({
  step,
  currentSteps,
  setCurrentSteps,
  task,
}: Props) => {
  const dispatch = useAppDispatch();
  const initialValues: IStep = {
    id: step.id,
    userId: step.userId,
    type: step.type,
    description: step.description,
    completed: false,
    taskId: step.taskId,
  };

  const handleSubmit = async (
    values: any,
    { resetForm }: FormikHelpers<IStep>
  ) => {
    if (values.description === initialValues.description) return;
    if (values.id === "") {
      await dispatch(createStepAsync(values));
      await dispatch(
        getStepsByIdAsync({ username: step.userId, taskId: step.taskId })
      );
    } else await dispatch(updateStepsAsync(values));
  };

  const handleComplete = async () => {
    if (task.completed) return;
    await dispatch(updateStepsAsync({ ...step!, completed: !step?.completed }));
    // fetch the updated completed count in the Item card
    await dispatch(
      getStepsByIdAsync({ username: step.userId, taskId: step.taskId })
    );
  };

  const handleDelete = async (currentStep: IStep) => {
    if (!currentStep.id && !currentStep.description) {
      // Remove in the local state
      const updatedCurrentSteps = currentSteps.filter(
        (step) => step.id !== currentStep.id
      );

      return setCurrentSteps(updatedCurrentSteps);
    }
    await dispatch(deleteStepAsync(step?.id!));
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <HorizontalCard
        paddingTop="0"
        paddingBottom="0"
        paddingLeft="15px"
        paddingRight="15px"
      >
        <Content>
          <CheckToggler
            complete={step?.completed}
            onComplete={handleComplete}
          />
        </Content>
        <Content flexGrow="1">
          <FormInput
            name="description"
            placeholder="Add a new step..."
            readOnly={task.completed ? true : false}
          />
        </Content>
        <MdClose cursor="pointer" onClick={() => handleDelete(step)} />
      </HorizontalCard>
    </Form>
  );
};

export default UpsertStepForm;
