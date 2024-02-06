import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import ProfileSidebar from "../components/ProfileSidebar";
import Figure from 'react-bootstrap/Figure';

import { AuthData } from "../services/AuthService";
import { createContext, useContext, useEffect, useState } from "react";
import ProfileNavbar from "../components/ProfileNavbar";
import ImageContainer from "../components/ImageContainer";
import ImageEditController from "../components/ImageEditController";
import UserInfo from "../components/UserInfo";
import UserInfoEdit from "./../components/UserInfoEdit";

const ProfileDashboard = () => {
  const { user, setShowSidebar } = AuthData();


  return (

    <div
      style={{
        backgroundColor: "",
        padding: "0px",
        margin: "0px",
        width: "100vw",
      }}
    >
      <Container
        style={{
          overflow: "auto",
          backgroundColor: "",
          height: "100%",
          width: "100vw",
          margin: "0px",
        }}
      >
        <Row>
          <Col style={{ backgroundColor: "black", margin: "0px", height : "100vh"}}>
            <Row>
              {" "}
              <ProfileNavbar />
            </Row>
            <Row style = {{display : "flex",paddingLeft : "1rem",margin : "auto", marginTop: "1rem", fontSize : "1.5rem", color : "#dda676"}}> Edit Details </Row>
            <Row style ={{paddingLeft : "1rem", display : "flex", paddingRight : "1rem"}}>
              <Col style ={{flex : "1"}}> <ImageEditController /> </Col>
              <Col style ={{marginLeft : "0px", flex : "3", marginRight: "7rem"}}> <UserInfoEdit /></Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileDashboard;
