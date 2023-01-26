import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import swal from "sweetalert";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { getCurrentUser, loginwithjwt } from "../../utils/loginService";
import { register } from "../../utils/signUpservices";
import socket from "../../utils/socket.io";
import index from "./index.module.css";

const SignUp = () => {
  const [data, setData] = useState({
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [error, setError] = useState({});

  const schema = {
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    userName: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
    email: Joi.string().required().label("Email"),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schemas = {
      [name]: schema[name],
    };
    const { error } = Joi.validate(obj, schemas);
    return error ? error.details[0].message : null;
  };

  const handleChange = ({ currentTarget: input }) => {
    const datas = { ...data };
    datas[input.name] = input.value;
    setData(datas);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(
        data.email,
        data.password,
        data.firstName,
        data.lastName,
        data.userName
      );
      swal({
        title: "Sign up Successful",
        text: "Logged In",
        icon: "success",
        button: true,
      }).then(() => {
        loginwithjwt(response.data.data.token);
        window.location = "/chat";
      });
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = { ...error };
        errors.username = err.response.data;
        toast.error(err.response.data.message);
        setError(errors);
      }
    }
  };
  const user = getCurrentUser();
  return user ? (
    <Navigate to="/chat" replace={true} />
  ) : (
    <div>
      <form className={index.login} onSubmit={handleSubmit}>
        <div className={index.column}>
          <label className={index.login_text} htmlFor="firstName">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={data.firstName}
            onChange={handleChange}
            className={index.input}
          />
        </div>
        <div className={index.column}>
          <label className={index.login_text} htmlFor="lastName">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={data.lastName}
            onChange={handleChange}
            className={index.input}
          />
        </div>
        <div className={index.column}>
          <label className={index.login_text} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            value={data.email}
            onChange={handleChange}
            className={index.input}
          />
        </div>
        <div className={index.column}>
          <label className={index.login_text} htmlFor="userName">
            Username
          </label>{" "}
          <input
            id="userName"
            name="userName"
            type="text"
            value={data.userName}
            onChange={handleChange}
            className={index.input}
          />
        </div>
        <div className={index.column}>
          <label className={index.login_text} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            autoComplete="on"
            value={data.password}
            onChange={handleChange}
            className={index.input}
          />
        </div>
        <button disabled={validate()} className={index.btn}>
          Sign Up
        </button>
      </form>
      <div>
        <p className={index.para}>
          Already Registered? <Link to="/login">Click Here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
