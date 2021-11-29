import React from "react";
import { FormikHelpers } from "formik";
import * as yup from "yup";

import { ITask } from "../../models/task.model";
import Form from "../forms/Form";
import FormTextArea from "../forms/FormTextArea";
import FormInput from "../forms/FormInput";
import { useAppDispatch } from "../../store/configureStore";
import { updateTaskAsync } from "../../store/taskSlice";

const validationSchema = yup.object().shape({
  note: yup.string().required(),
});

type Props = {
  task: ITask;
};
const UpsertTaskNoteForm = ({ task }: Props) => {
  const dispatch = useAppDispatch();

  const initialValues: ITask = {
    id: task.id,
    userId: task.userId,
    type: task.type,
    description: task.description,
    completed: task.completed,
    important: task.important,
    note: task.note,
  };

  const handleSubmit = async (
    values: any,
    { resetForm }: FormikHelpers<any>
  ) => {
    await dispatch(updateTaskAsync({ ...values }));
  };

  const iterateInitialValues = () => {
    let prop: keyof typeof initialValues;
    let arr = [];

    for (prop in initialValues) {
      if (prop !== "note")
        arr.push(<FormInput key={prop} name={prop} type="hidden" />);
    }
    return arr;
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {iterateInitialValues()}
      <FormTextArea name="note" placeholder="Add note..." />
    </Form>
  );
};

export default UpsertTaskNoteForm;
