import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import ProfileSidebar from "../components/ProfileSidebar";

import { AuthData } from "../services/AuthService";
import { createContext, useContext, useEffect, useState } from "react";
import ProfileNavbar from "../components/ProfileNavbar";


const ProfileDashboard = () => {
  const {user, setShowSidebar} = AuthData();

  // useEffect(() => {
  //   setShowSidebar(false);
  //   localStorage.setItem("showSidebar", false);

  // }, [])
  
  return (
    
    // background-color: #ca7968;
//     // background-image: linear-gradient(315deg, #ca7968 0%, #0c0c0c 74%);
//     background-color: #ca7968;
// // background-image: linear-gradient(315deg, #ca7968 0%, #0c0c0c 74%);
// background-color: #43302e;
// background-image: linear-gradient(315deg, #43302e 0%, #ad6f69 74%);


    
    <div style = {{backgroundColor: "", padding : "0px", margin : "0px", width : "100vw"}}>
      <Container style ={{overflow: "auto", backgroundColor : "", height : "100%", width : "100vw", margin : "0px" }}>
        <Row>
          {/* <Col style = {{"backgroundColor" : "#d7d3d338", boxShadow: "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;}}sm={2}",
          height : "100vh", opacity: "1", padding : "1rem", paddingTop : "2rem", margin : "auto"
        }}>
           <Row style = {{opacity: "100"}}>
            <span style ={{opacity : "1", fontSize: "1rem"}}><span style={{color : "#bf6320", fontWeight: "bold"}}>T</span>hemesis <span style = {{color : "#bf6320", fontWeight: "bold"}}>G</span>uardian</span>
           </Row>
           <Row style={{margin : "auto", marginTop: "2rem"}}>
           <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col>
          <Nav style = {{color : "white"}} variant="underline" className="flex-column text-white">
            <Nav.Item>
              <Nav.Link eventKey="first"><div className = "text-white">Dashboard</div></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second"><div className = "text-white">Profile</div></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third"><div className = "text-white">Edit Details</div></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fourth"><div className = "text-white">Change Password</div></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fifth"><div className = "text-white">Logout</div></Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </Tab.Container>
           </Row>
        </Col> */}
        <Col style = {{boxShadow: "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;}}",
          height : "100vh", opacity: "1", paddingLeft: "0px", margin : "0px", paddingRight: "0px"
        }} sm={3}>
        <ProfileSidebar />
        </Col>

                
          <Col style = {{"backgroundColor" : "red", margin : "0px"}}sm={9}>
            <Row> <ProfileNavbar /></Row>
            <Row> user profile </Row>
            <Row>
              <Col> image </Col>
              <Col> User Info </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileDashboard;
