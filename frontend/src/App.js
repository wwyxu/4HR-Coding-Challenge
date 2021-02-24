import React, { Fragment, useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { getData, storeData } from "./utils/localstorage";

import Login from "./components/Login";
import Register from "./components/Register";
import Landing from "./components/Landing";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/Navbar";

toast.configure();

function App() {
  const isAuth = () => getData("isAuthenticated") || null;
  const [isAuthenticated, setIsAuthenticated] = useState(isAuth);
  const [loading, setLoading] = useState(false);

  const checkAuthenticated = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/authentication/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

      parseRes === true
        ? storeData("isAuthenticated", true)
        : storeData("isAuthenticated", false);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <BrowserRouter>
        <div className="container-fluid p-0">
          <div className="row no-gutters">
            <div className="col-md-2 d-none d-md-block">
              <Navbar
                isAuthenticated={isAuthenticated}
                setAuth={setAuth}
                loading={loading}
              />
            </div>
            <div className="col-md-10 col-sm-12">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) =>
                    !isAuthenticated ? (
                      <Landing {...props} />
                    ) : (
                      <Redirect to="/profile" />
                    )
                  }
                />
                <Route
                  exact
                  path="/login"
                  render={(props) =>
                    !isAuthenticated ? (
                      <Login {...props} setAuth={setAuth} />
                    ) : (
                      <Redirect to="/profile" />
                    )
                  }
                />
                <Route
                  exact
                  path="/register"
                  render={(props) =>
                    !isAuthenticated ? (
                      <Register {...props} />
                    ) : (
                      <Redirect to="/profile" />
                    )
                  }
                />
                <Route
                  exact
                  path="/profile"
                  render={(props) => <Profile {...props} />}
                />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
