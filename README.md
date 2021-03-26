# Table of Contents <!-- omit in toc -->

- [What is Formik?](#what-is-formik)
- [Installation](#installation)
- [Formik Hook](#formik-hook)
  - [Injecting Formik](#injecting-formik)
  - [Handling Form Submission](#handling-form-submission)
  - [Handling Form Validation with Yup](#handling-form-validation-with-yup)
  - [Displaying Error Messages](#displaying-error-messages)
  - [Displaying Error Messages On Visited Fields](#displaying-error-messages-on-visited-fields)
  - [Custom Validation Messeges](#custom-validation-messeges)
  - [Code Refactor](#code-refactor)
- [Formik Components](#formik-components)
  - [Login Form With Formik Components](#login-form-with-formik-components)

# What is Formik?

[Formik](https://formik.org/) is a library that helps developers do deal with Forms in React and React Native.

As developers we need to:

- Handle form data
- Validation
- Visual feedback with errors messages
- Form submission

With Formik, we can do all that in an easy, scalable, and performant way.

# Installation

```
npm i --save formik
```

# Formik Hook

Creating a Login Form with:

- Email
- Password
- Remember me

```jsx
import React from "react";

/**
 * LoginForm Component
 */
const LoginForm = () => {
  return (
    <form>
      <div style={{ padding: 20 }}>
        <label htmlFor="email" style={{ display: "block" }}>
          email
        </label>
        <input type="email" id="email" />

        <label htmlFor="password" style={{ display: "block" }}>
          password
        </label>
        <input type="password" id="password" />

        <label htmlFor="rememberMe" style={{ display: "block" }}>
          remember me
        </label>
        <input type="checkbox" id="rememberMe" />

        <button style={{ display: "block" }}>submit</button>
      </div>
    </form>
  );
};
export default LoginForm;
```

## Injecting Formik

- Import `useFormik` hook and add `initialValues` property with each `input` name.
- Add a `name` attritbute to each `input` element corresponding to `initialValues` key names.
- Add `formik.values[name]` to `value` attribute on each `input` element.
  - For checkboxes add `defaultChecked={formik.values[name]}` for initial value.
- Add `formik.handleChange` to `onChange` attribute on each `input` element.
- Print the `formik` object inside `<pre>` tag.
- Fill all `input` elements and see the changes on `formik` object.

```jsx
import React from "react";
import { useFormik } from "formik";

/**
 * LoginForm Component
 */
const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  return (
    <form>
      <div style={{ padding: 20 }}>
        <label htmlFor="email" style={{ display: "block" }}>
          email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        <label htmlFor="password" style={{ display: "block" }}>
          password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />

        <label htmlFor="rememberMe" style={{ display: "block" }}>
          remember me
        </label>
        <input
          type="checkbox"
          name="rememberMe"
          id="rememberMe"
          onChange={formik.handleChange}
          defaultChecked={formik.values.rememberMe}
        />

        <button style={{ display: "block" }}>submit</button>
      </div>
      <pre>{JSON.stringify(formik, null, 4)}</pre>
    </form>
  );
};
export default LoginForm;
```

## Handling Form Submission

- Add `formik.handleSubmit` to `onSubmit` attribute on the `form` element.
- Add `onSubmit` as a second property on the object inside `useFormik` hook.
- log the `values` passed to `onSubmit` function.

```jsx
import React from "react";
import { useFormik } from "formik";

/**
 * LoginForm Component
 */
const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (values) => console.log(JSON.stringify(values, null, 4)),
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div style={{ padding: 20 }}>
        <label htmlFor="email" style={{ display: "block" }}>
          email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        <label htmlFor="password" style={{ display: "block" }}>
          password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />

        <label htmlFor="rememberMe" style={{ display: "block" }}>
          remember me
        </label>
        <input
          type="checkbox"
          name="rememberMe"
          id="rememberMe"
          onChange={formik.handleChange}
          defaultChecked={formik.values.rememberMe}
        />

        <button style={{ display: "block" }}>submit</button>
      </div>
      <pre>{JSON.stringify(formik, null, 4)}</pre>
    </form>
  );
};
export default LoginForm;
```

## Handling Form Validation with Yup

- Install [Yup](https://github.com/jquense/yup)

```
npm install yup --save
```

- Import Yup
  `import * as yup from "yup"`
- Create validationSchema property on the object inside `useFormik` hook.
- Submit the form with no values and see the `errors` object inside the printed `formik` object.

```jsx
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

/**
 * LoginForm Component
 */
const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (values) => console.log(JSON.stringify(values, null, 4)),
    validationSchema: yup.object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    }),
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div style={{ padding: 20 }}>
        <label htmlFor="email" style={{ display: "block" }}>
          email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        <label htmlFor="password" style={{ display: "block" }}>
          password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />

        <label htmlFor="rememberMe" style={{ display: "block" }}>
          remember me
        </label>
        <input
          type="checkbox"
          name="rememberMe"
          id="rememberMe"
          onChange={formik.handleChange}
          defaultChecked={formik.values.rememberMe}
        />

        <button style={{ display: "block" }}>submit</button>
      </div>
      <pre>{JSON.stringify(formik, null, 4)}</pre>
    </form>
  );
};
export default LoginForm;
```

## Displaying Error Messages

- Create a `<div>` tag and check for `formik.errors[name]` to display the error message beneathe each element that has a validation.

```jsx
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

/**
 * LoginForm Component
 */
const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (values) => console.log(JSON.stringify(values, null, 4)),
    validationSchema: yup.object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    }),
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div style={{ padding: 20 }}>
        <label htmlFor="email" style={{ display: "block" }}>
          email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.errors.email && (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        )}

        <label htmlFor="password" style={{ display: "block" }}>
          password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.errors.password && (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        )}

        <label htmlFor="rememberMe" style={{ display: "block" }}>
          remember me
        </label>
        <input
          type="checkbox"
          name="rememberMe"
          id="rememberMe"
          onChange={formik.handleChange}
          defaultChecked={formik.values.rememberMe}
        />

        <button style={{ display: "block" }}>submit</button>
      </div>
      <pre>{JSON.stringify(formik, null, 4)}</pre>
    </form>
  );
};
export default LoginForm;
```

## Displaying Error Messages On Visited Fields

- Add `formik.handleBlur` with `onBlur` attribute with all `input` elements.
- Visit each `input` element and see the `touched` object inside the printed `formik` object.
- Add `formik.touched[name]` before `formik.errors[name]` with the error tag element.

```jsx
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

/**
 * LoginForm Component
 */
const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (values) => console.log(JSON.stringify(values, null, 4)),
    validationSchema: yup.object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    }),
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div style={{ padding: 20 }}>
        <label htmlFor="email" style={{ display: "block" }}>
          email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        )}

        <label htmlFor="password" style={{ display: "block" }}>
          password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        )}

        <label htmlFor="rememberMe" style={{ display: "block" }}>
          remember me
        </label>
        <input
          type="checkbox"
          name="rememberMe"
          id="rememberMe"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          defaultChecked={formik.values.rememberMe}
        />

        <button style={{ display: "block" }}>submit</button>
      </div>
      <pre>{JSON.stringify(formik, null, 4)}</pre>
    </form>
  );
};
export default LoginForm;
```

## Custom Validation Messeges

You can pass a custom validation message on each field as a string argument of the yup validation function.

```jsx
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

/**
 * LoginForm Component
 */
const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (values) => console.log(JSON.stringify(values, null, 4)),
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Please enter a valid email address")
        .required("Email field is required"),
      password: yup.string().required("Password field is required"),
    }),
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div style={{ padding: 20 }}>
        <label htmlFor="email" style={{ display: "block" }}>
          email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        )}

        <label htmlFor="password" style={{ display: "block" }}>
          password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        )}

        <label htmlFor="rememberMe" style={{ display: "block" }}>
          remember me
        </label>
        <input
          type="checkbox"
          name="rememberMe"
          id="rememberMe"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          defaultChecked={formik.values.rememberMe}
        />

        <button style={{ display: "block" }}>submit</button>
      </div>
      <pre>{JSON.stringify(formik, null, 4)}</pre>
    </form>
  );
};
export default LoginForm;
```

## Code Refactor

Let us make our code more organized and decrease the lines of code by doing the following:

- Substitute

```
value={formik.values[name]}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
```

with

```
{...formik.getFieldProps(name)}
```

- Separate `initialValues`, `onSubmit`, and `validationSchema`

```jsx
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

/**
 * LoginForm Component
 */
const LoginForm = () => {
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

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div style={{ padding: 20 }}>
        <label htmlFor="email" style={{ display: "block" }}>
          email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email && (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        )}

        <label htmlFor="password" style={{ display: "block" }}>
          password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password && (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        )}

        <label htmlFor="rememberMe" style={{ display: "block" }}>
          remember me
        </label>
        <input
          type="checkbox"
          name="rememberMe"
          id="rememberMe"
          defaultChecked={formik.values.rememberMe}
          {...formik.getFieldProps("rememberMe")}
        />

        <button style={{ display: "block" }}>submit</button>
      </div>
      <pre>{JSON.stringify(formik, null, 4)}</pre>
    </form>
  );
};
export default LoginForm;
```

# Formik Components

Formik provides a few Components to be used that will save us more time, reduce code duplication, and make the code more consistent and organized.

## Login Form With Formik Components

- Import `Formik`, `Form`, `Field` and `ErrorMessage` from `formik`.
- Wrap and return the entire form inside `<Formik>` Component with `formik` as a parameter.
- Add `initialValues`, `onSubmit` and `validationSchema` as **Props** to `<Formik>` Component.
- Replace the native `<form>` element with `<Form>` Component.
- Wrap and return the `label`, `input`, and the `validation div message` inside `<Field>` with `formikField` as a parameter.
- Add the `name` attribute to the `<Field>` component instead of the `<input>` element.
- spread `{...formikField.field}` inside the `<input>` element.
- Wrap and return the `validation div` inside `<ErrorMessage>` component with `ErrMessage` as a parameter and add the `name` attribute to it.
- log `formikField` inside a `<pre>` to see the entire `formikField` object.

```jsx
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
```
