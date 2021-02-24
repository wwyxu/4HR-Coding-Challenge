import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = ({ isAuthenticated, setAuth, loading }) => {
  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      {isAuthenticated ? (
        <div className="container-fluid sidebar p-0">
          {loading ? (
            <h2>Loading</h2>
          ) : (
            <div className="container-fluid bg-light p-0 ">
              <h5 className="list-group-item bg-light text-center m-0">
                MSTS Assignment
              </h5>
              <a
                className="list-group-item bg-light text-center"
                type="button"
                onClick={(e) => logout(e)}
              >
                {" "}
                Logout
              </a>
            </div>
          )}
        </div>
      ) : (
        <div className="container-fluid sidebar p-0">
          {loading ? (
            <h2>Loading</h2>
          ) : (
            <div className="container-fluid bg-light p-0 ">
              <h5 className="list-group-item bg-light text-center m-0">
                MSTS Assignment
              </h5>
              <NavLink activeStyle={{ color: "black" }} to="/">
                <a className="list-group-item bg-light text-center">Home</a>
              </NavLink>
              <NavLink activeStyle={{ color: "black" }} to="/login">
                <a className="list-group-item bg-light text-center">Log In</a>
              </NavLink>
              <NavLink activeStyle={{ color: "black" }} to="/register">
                <a className="list-group-item bg-light text-center">Register</a>
              </NavLink>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Navbar;
