import { Field } from "formik";
import React from "react";
import FormikErrorMessage from "./FormikErrorMessage";

/**
 * FormikField Component
 */
const FormikField = ({ name, type, label, defaultChecked }) => {
  return (
    <Field name={name}>
      {(formikField) => {
        return (
          <>
            <label htmlFor={name} style={{ display: "block" }}>
              {label}
            </label>
            <input
              type={type}
              id={name}
              {...formikField.field}
              defaultChecked={formikField.field.value}
            />
            <FormikErrorMessage name={name} />
            <pre>{JSON.stringify(formikField, null, 4)}</pre>
          </>
        );
      }}
    </Field>
  );
};

export default FormikField;
