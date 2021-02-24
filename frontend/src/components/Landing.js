import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="jumbotron mt-5">
      <h1>MSTS Assignment</h1>
      <Link to="/login" className="btn btn-primary">
        Login
      </Link>
      <Link to="/register" className="btn btn-primary ml-3">
        Register
      </Link>
    </div>
  );
};

export default Landing;
