import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { AuthData } from '../services/AuthService';

const ProfileNavbar = () => {
    const {user} = AuthData();
    console.log(JSON.parse(user.user).image);
  return (
    <div style = {{margin : "0px", paddingLeft : "0px", paddingRight : "0px"}}>
         <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary ">
      <Container>
        <Navbar.Brand href="/me"><div style = {{display: "flex"}}><div style ={{heigth : "2rem", width : "2rem", borderRadius: "50%", marginLeft : "43rem"}}><img src = {JSON.parse(user.user).image} style ={{height : "2rem", width : "2rem", borderRadius : "50%"}}/></div><span style = {{fontSize: "1rem", marginLeft : "0.8rem", margiTop : "auto"}}>{JSON.parse(user.user).username}</span></div></Navbar.Brand>
      </Container>
    </Navbar>
      
    </div>
  )
}

export default ProfileNavbar
