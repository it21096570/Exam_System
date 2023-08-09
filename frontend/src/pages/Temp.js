import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";


function Temp() {
    return (
        <div className='userRegister'>

            <Formik>

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
                        autocomplete="off"
                        id="inputUser"
                        name="password"
                        placeholder="(Password)"
                    />

                    <button type="submit">Register</button>

                </Form>

            </Formik>

        </div>
    )
}

export default Temp
