import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

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
              <Field name="email">
                {(formikField) => {
                  return (
                    <>
                      <label htmlFor="email" style={{ display: "block" }}>
                        email
                      </label>
                      <input type="email" id="email" {...formikField.field} />
                      <ErrorMessage name="email">
                        {(errMessage) => {
                          return (
                            <div style={{ color: "red" }}>{errMessage}</div>
                          );
                        }}
                      </ErrorMessage>
                      <pre>{JSON.stringify(formikField, null, 4)}</pre>
                    </>
                  );
                }}
              </Field>

              <Field name="password">
                {(formikField) => {
                  return (
                    <>
                      <label htmlFor="password" style={{ display: "block" }}>
                        password
                      </label>
                      <input
                        type="password"
                        id="password"
                        {...formikField.field}
                      />
                      <ErrorMessage name="password">
                        {(errMessage) => {
                          return (
                            <div style={{ color: "red" }}>{errMessage}</div>
                          );
                        }}
                      </ErrorMessage>
                      <pre>{JSON.stringify(formikField, null, 4)}</pre>
                    </>
                  );
                }}
              </Field>

              <Field name="rememberMe">
                {(formikField) => {
                  return (
                    <>
                      <label htmlFor="rememberMe" style={{ display: "block" }}>
                        remember me
                      </label>
                      <input
                        type="checkbox"
                        id="rememberMe"
                        defaultChecked={formikField.field.value}
                        {...formikField.field}
                      />
                      <pre>{JSON.stringify(formikField, null, 4)}</pre>
                    </>
                  );
                }}
              </Field>
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
