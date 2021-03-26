import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import FormikField from "./shared/FormikField";

/**
 * LoginFormikComponents Component
 */
const LoginFormikComponents = () => {
  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };
  const onSubmit = (values) => console.log(JSON.stringify(values, null, 4));
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email field is required"),
    password: yup.string().required("Password field is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <Form>
            <div style={{ padding: 20 }}>
              <FormikField label="Email" name="email" type="email" />
              <FormikField label="Password" name="password" type="password" />
              <FormikField
                label="Remember Me"
                name="rememberMe"
                type="checkbox"
              />
              <button style={{ display: "block" }}>submit</button>
            </div>
            <pre>{JSON.stringify(formik, null, 4)}</pre>
          </Form>
        );
      }}
    </Formik>
  );
};
export default LoginFormikComponents;
