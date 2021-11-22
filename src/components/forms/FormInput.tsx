import React from "react";
import { useFormikContext } from "formik";

import { IStep, ITask } from "../../models/task.model";

type Props = {
  name: string;
  ref?: React.RefObject<HTMLInputElement>;
  placeholder?: string;
  type?: string;
};
const FormInput = ({ name, ref, placeholder, type = "text" }: Props) => {
  const { handleChange, submitForm, values } = useFormikContext<
    ITask | IStep
  >();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== " " && e.code === "Enter") submitForm();
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    submitForm();
  };

  return (
    <input
      autoFocus
      className="form-control"
      name={name}
      onBlur={handleBlur}
      onChange={handleChange(name)}
      onKeyPress={handleKeyPress}
      placeholder={placeholder}
      type={type}
      value={(values as any)[name]}
      ref={ref}
    />
  );
};

export default FormInput;
