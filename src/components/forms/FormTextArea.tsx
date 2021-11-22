import { useFormikContext } from "formik";
import React from "react";
import { ITask } from "../../models/task.model";

type Props = {
  name: string;
  placeholder: string;
};
const FormTextArea = ({ name, placeholder }: Props) => {
  const { handleChange, submitForm, values } = useFormikContext<ITask>();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== " " && e.code === "Enter") submitForm();
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    submitForm();
  };

  return (
    <textarea
      className="form-control"
      name={name}
      onChange={handleChange(name)}
      onKeyPress={handleKeyPress}
      onBlur={handleBlur}
      placeholder={placeholder}
      value={(values as any)[name]}
    ></textarea>
  );
};

export default FormTextArea;
