import React, { Fragment, useState } from "react";

const EditProfile = ({ profile, address, phone, setProfileChange }) => {
  const editProfile = async () => {
    try {
      const body = { name, delivery, billing, home, work, mobile };

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch(`http://localhost:5000/users/updateprofile`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      setProfileChange(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const [inputs, setInputs] = useState({
    name: profile.name,
    delivery: address.delivery,
    billing: address.billing,
    home: phone.home,
    work: phone.work,
    mobileL: phone.mobile,
  });

  const { name, delivery, billing, home, work, mobile } = inputs;

  // Set Target to Inputs
  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Edit
      </button>
      <div
        className="modal"
        id="exampleModal"
        onClick={() =>
          setInputs({
            name: profile.name,
          })
        }
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Profile</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() =>
                  setInputs({
                    name: profile.name,
                  })
                }
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <input
                type="name"
                name="name"
                value={name}
                placeholder="Name"
                required={true}
                onChange={(e) => onChange(e)}
                className="form-control my-3"
              />
              <input
                type="delivery"
                name="delivery"
                value={delivery}
                placeholder="Delivery Address"
                required={true}
                onChange={(e) => onChange(e)}
                className="form-control my-3"
              />
              <input
                type="billing"
                name="billing"
                value={billing}
                placeholder="Billing Address"
                required={true}
                onChange={(e) => onChange(e)}
                className="form-control my-3"
              />
              <input
                type="home"
                name="home"
                value={home}
                placeholder="Home Phone Number"
                required={true}
                onChange={(e) => onChange(e)}
                className="form-control my-3"
              />
              <input
                type="work"
                name="work"
                value={work}
                placeholder="Work Phone Number"
                required={true}
                onChange={(e) => onChange(e)}
                className="form-control my-3"
              />
              <input
                type="mobile"
                name="mobile"
                value={work}
                placeholder="Mobile Phone Number"
                required={true}
                onChange={(e) => onChange(e)}
                className="form-control my-3"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={() => editProfile()}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-info"
                data-dismiss="modal"
                onClick={() =>
                  setInputs({
                    name: profile.name,
                    billing: address.billing,
                    delivery: address.delivery,
                    home: address.home,
                    work: address.work,
                    mobile: address.mobile,
                  })
                }
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditProfile;
