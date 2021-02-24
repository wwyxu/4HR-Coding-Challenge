import React, { useState, useEffect } from "react";
import UpdateProfile from "./UpdateProfile";

const Profile = () => {
  const [profile, setProfile] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [profileChange, setProfileChange] = useState(false);
  const [loading, setLoading] = useState(false);

  const getProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/users/currentuser`, {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();

      console.log(parseData);

      setProfile(parseData);
      setAddress(parseData.address);
      setPhone(parseData.phone);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
    setProfileChange(false);
  }, [profileChange]);

  return (
    <div className="text-center mb-3 mt-5">
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          <div>{profile.email}</div>
          <div>{profile.name}</div>
          <div>{address.delivery}</div>
          <div>{address.billing}</div>
          <div>{phone.home}</div>
          <div>{phone.work}</div>
          <div>{phone.mobile}</div>
          <UpdateProfile
            profile={profile}
            address={address}
            phone={phone}
            setProfileChange={setProfileChange}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
