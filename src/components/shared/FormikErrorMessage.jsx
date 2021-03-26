import { ErrorMessage } from "formik";
import React from "react";

/**
 * FormikErrorMessage Component
 */
const FormikErrorMessage = ({ name }) => {
  return (
    <ErrorMessage name={name}>
      {(errMessage) => {
        return <div style={{ color: "red" }}>{errMessage}</div>;
      }}
    </ErrorMessage>
  );
};

export default FormikErrorMessage;
