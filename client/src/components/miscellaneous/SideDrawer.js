import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import axios from 'axios';
import ChatLoading from './ChatLoading';
import UserListItem from '../userAvator/UserListItem';
import { AuthData } from '../../services/AuthService';
import getCookies from '../../hooks/getCookies';
import Spinner from 'react-bootstrap/Spinner';



const SideDrawer = () => {
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [chatLoading, setChatLoading] = useState(false);
    const { user, selectedChat, setSelectedChat, chats, setChats } = AuthData();



    const handleSearch = async () => {

        if(!search){
        alert('Please enter something to search!!');
        return;
        }

        try{
            setLoading(true);
            const {data} = await axios.get(`http://127.0.0.1:5001/api/v1/users/getUsers?search=${search}`);
            console.log(data);
            setLoading(false);
            setSearchResult(data);
            setChatLoading(true);
        }
        catch(error){
            alert('No Users Found!!');
            console.log(error);
        }


    }

    const accessChat = async (userId) => {
        try{
            setChatLoading(true);

            const config = {
              headers : {
                "Content-Type" : "application/json",
                authorization : `Bearer ${getCookies("jwt")}`,
              },
            };

            const {data} = await axios.post("http://127.0.0.1:5001/api/v1/chats", {userId},config );

            if(!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setChatLoading(false);
            setSelectedChat(data);
            // onClose();
            console.log(data);

        }
        catch(err){
             alert("Error loading the chats!!");
             console.log("Error", err);
        }
    }  
    return (
      <>
        <Button style={{width: "50%", height : "80%"}} variant="info"  onClick={handleShow}>
        <i class="bi bi-search"></i> Search Users
        </Button>
  
        <Offcanvas show={show} onHide={handleClose} className="mb-0">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Search Users</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
          <input 
          placeholder = "Search by name or email"
          value = {search}
          onChange = {(e) => {setSearch(e.target.value)}}/>
        <Button variant="outline-secondary"
         onClick = {handleSearch}
         >Go</Button>
          </Offcanvas.Body>
          {loading ? (<ChatLoading/>) : (
            searchResult?.map(user => 
                <UserListItem 
                key = {user._id}
                user = {user}
                handleFunction = {() => accessChat(user._id)} />
            )
          )}

          {chatLoading &&  <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>}
        </Offcanvas>
      </>
    );
}

export default SideDrawer
