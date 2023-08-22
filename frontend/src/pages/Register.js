import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios';

function Register() {

  let role;

  const initialValues = {
    nic: "",
    name: "",
    role: "",
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    nic: Yup.number().required(),
    name: Yup.string().required(),
    role: Yup.string().required(),
    username: Yup.string().required(),
    password: Yup.string().required(),
  })

  const onSubmit = (data) => {
    axios.post("http://localhost:5001/user", data).then((response) => {

      console.log(data)
      role = data.role
      console.log(data.name)

      /* if (role === "student" || role === "Student") {

        const studentData = {
          name: data.name,
          nic: data.nic,
        };

        axios.post("http://localhost:5001/student", studentData)
          .then((studentResponse) => {

            console.log(studentData)
            console.log("Student details inserted:", studentResponse.data);
          })
          .catch((error) => {
            console.error("Error inserting student details:", error);
          });

      } */

      alert("Success: User Added successfully!");
      //window.location.reload(); // Refresh the page

    }).catch((error) => {
      console.error("An error occurred:", error);
    });
  };

  return (
    <div className='userRegister'>

      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>

        <Form className="formContainer">

          <label>NIC: </label>
          <ErrorMessage name="nic" component="span" />
          <Field
            autocomplete="off"
            id="inputUser"
            name="nic"
            placeholder="(NIC)"
          />
          <label>Name: </label>
          <ErrorMessage name="name" component="span" />
          <Field
            autocomplete="off"
            id="inputUser"
            name="name"
            placeholder="(Name)"
          />
          <label>Role: </label>
          <ErrorMessage name="role" component="span" />
          <Field
            autocomplete="off"
            id="inputUser"
            name="role"
            placeholder="(Role)"
          />
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="inputUser"
            name="username"
            placeholder="(Username)"
          />
          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            type="password"
            autocomplete="off"
            id="inputUser"
            name="password"
            placeholder="(Password)"
          />

          <button type="submit">Register</button>

        </Form>

      </Formik>

    </div>

  );
}

export default Register;
