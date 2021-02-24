import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    password2: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const { email, password, password2, name } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords must match");
      return;
    } else {
      try {
        const body = { email, password, password2, name };
        const response = await fetch("http://localhost:5000/users/register", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const parseRes = await response.json();

        if (parseRes === "success") {
          toast.success("Registration Successful");
        } else {
          toast.error(parseRes);
        }
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  return (
    <Fragment>
      <div className="card p-4 mt-5">
        <h1 className="text-center">Register</h1>
        <form onSubmit={onSubmitForm}>
          <input
            type="text"
            name="email"
            value={email}
            placeholder="Email"
            required={true}
            onChange={(e) => onChange(e)}
            className="form-control my-3"
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            required={true}
            onChange={(e) => onChange(e)}
            className="form-control my-3"
          />
          <input
            type="password"
            name="password2"
            value={password2}
            placeholder="Confirm Password"
            required={true}
            onChange={(e) => onChange(e)}
            className="form-control my-3"
          />
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Name"
            required={true}
            onChange={(e) => onChange(e)}
            className="form-control my-3"
          />
          {loading ? (
            <button className="btn btn-success btn-block" disabled>
              Loading...
            </button>
          ) : (
            <button className="btn btn-success btn-block">Register</button>
          )}
        </form>
      </div>
    </Fragment>
  );
};

export default Register;
