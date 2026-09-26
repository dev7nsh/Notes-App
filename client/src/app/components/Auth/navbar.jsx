import React, { useContext, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/app/context/AuthContext';
import "./Main.css";

const Navbar = () => {
  const router = useRouter();
  const { AuthData, Authdispatch } = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/30");

  // Ensure profilePic is set on the client side after hydration
  useEffect(() => {
    if (AuthData?.profilepic) {
      setProfilePic(AuthData.profilepic); // Set the actual profile pic if available
    }
  }, [AuthData]);

  return (
    <section className="navbar" style={{ width: "100%" }}>
      <nav className="navbar" style={{ width: "100%" }}>
        <div className="container-fluid">
          <a className="navbar-brand">Icon</a>
          <h2>MY NOTES</h2>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2 bg-body-tertiary"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <div className="profile-container">
            <img
              src={profilePic}  // Using the updated profilePic state
              alt="Profile"
              className="rounded-circle"
              width="40"
              height="40"
              style={{ marginRight: "40px", cursor: "pointer" }}
            />
            <ul className="list">
              <li>
                <button onClick={() => router.push("/pages/Profile")}>Profile</button>
              </li>
              <li className="mt-2">
                <button
                  onClick={() => {
                    Authdispatch({ type: "SIGN_OUT" });
                    router.push("/");
                  }}
                >
                  LogOut
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
