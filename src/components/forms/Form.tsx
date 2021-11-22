import { Formik, FormikHelpers } from "formik";
import React from "react";

type Props = {
  children: React.ReactNode;
  initialValues: {};
  onSubmit: (
    values: any,
    formikHelpers: FormikHelpers<any>
  ) => void | Promise<any>;
  validationSchema: any;
};
const Form = ({
  children,
  initialValues,
  onSubmit,
  validationSchema,
}: Props) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
};

export default Form;
