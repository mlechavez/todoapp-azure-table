import React from "react";
import { MdAddCircleOutline } from "react-icons/md";
import * as yup from "yup";
import { ITask } from "../../models/task.model";

import { useAppDispatch } from "../../store/configureStore";
import { createTaskAsync } from "../../store/taskSlice";
import FormInput from "../forms/FormInput";
import Form from "../forms/Form";
import { Content, HorizontalCard } from "./styles";
import { FormikHelpers } from "formik";
import { useMsal } from "@azure/msal-react";

const schema = yup.object().shape({
  description: yup.string().required().min(3).label("Description"),
});

const initialValues: ITask = {
  id: "",
  userId: "",
  type: "",
  description: "",
  completed: false,
  myDay: false,
  important: false,
  note: "",
};

const AddTaskForm = () => {
  const dispatch = useAppDispatch();
  const { accounts } = useMsal();

  initialValues.userId = accounts[0].username;

  const handleSubmit = async (
    values: any,
    { resetForm }: FormikHelpers<ITask>
  ) => {
    await dispatch(createTaskAsync(values));
    resetForm({
      values: {
        id: "",
        userId: values.userId,
        type: "",
        description: "",
        completed: false,
        myDay: false,
        important: false,
        note: "",
      },
    });
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <HorizontalCard>
        <Content>
          <MdAddCircleOutline size="22" />
        </Content>
        <Content flexGrow="1">
          <FormInput name="description" placeholder="Add a new task..." />
        </Content>
      </HorizontalCard>
    </Form>
  );
};

export default AddTaskForm;
