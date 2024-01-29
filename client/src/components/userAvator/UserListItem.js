import React from "react";
import { AuthData } from "../../services/AuthService";
import Card from "react-bootstrap/Card";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Card onClick = {handleFunction}>
       {/* <Card.Img variant="left" src={user.image} /> */}
      <Card.Body>{user.name}</Card.Body>
    </Card>
  );
};

export default UserListItem;
