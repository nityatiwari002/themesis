import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { AuthData } from "../services/AuthService";

const ProfileNavbar = () => {
  const { user } = AuthData();
  console.log(JSON.parse(user.user).image);
  return (
    <div style={{ margin: "0px", paddingLeft: "0px", paddingRight: "0px" }}>
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        expand="lg"
        className="bg-body-tertiary "
      >
        <Container style={{ display: "flex", boxSizing: "border-box" }}>
          <Navbar.Brand href="/me" style={{ display: "flex", width: "100%", zIndex : "1000" }}>
            <div style={{ width: "80%" }}></div>
            <div style={{ display: "flex", widht: "20%" }}>
              <div
                style={{ heigth: "2rem", width: "2rem", borderRadius: "50%" }}
              >
                <img
                  src={JSON.parse(user.user).image}
                  style={{ height: "2rem", width: "2rem", borderRadius: "50%" }}
                />
              </div>
              <span
                style={{
                  fontSize: "1rem",
                  margin: "auto",
                  marginLeft: "0.8rem",
                }}
              >
                {JSON.parse(user.user).username}
              </span>
            </div>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};

export default ProfileNavbar;