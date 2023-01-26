import Joi from "joi-browser";
import swal from "sweetalert";
import { useState } from "react";
import { useLocation, Navigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getCurrentUser, login } from "../../utils/loginService";
import index from "./index.module.css";

const Login = () => {
  const { state } = useLocation();

  const [error, setError] = useState({});
  const [data, setData] = useState({ userName: "", password: "" });

  const schema = {
    userName: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    setError(errors || {});
    if (errors) return;

    try {
      await login(data.userName, data.password);
      swal({
        title: "Successful",
        text: "You have Logged In!",
        icon: "success",
        button: true,
      }).then(() => {
        window.location = state ? state.from.pathname : "/chat";
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
  const handleChange = ({ currentTarget: input }) => {
    const errors = { ...error };
    const errorMessage = validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const datas = { ...data };
    datas[input.name] = input.value;
    setData(datas);
    setError(errors);
  };
  const user = getCurrentUser();

  return user ? (
    <Navigate to="/chat" replace={true} />
  ) : (
    <div>
      <form className={index.login} onSubmit={handleSubmit}>
        <div className={index.column}>
          <label className={index.login_text} htmlFor="email/username">
            Email/Username
          </label>
          <input
            name="userName"
            id="email/username"
            type="text"
            autoComplete="on"
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
            name="password"
            type="password"
            value={data.password}
            autoComplete="on"
            onChange={handleChange}
            className={index.input}
          />
        </div>
        <button disabled={validate()} className={index.btn}>
          Login
        </button>
      </form>
      <div>
        <p className={index.para}>
          Not yet Registered? <Link to="/signup">Click Here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
