import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import RenderRoutes from "../routes/RenderRoutes";
import ChatIcon from "../components/ChatIcon";
import setCookies from "../hooks/setCookies";
import getCookies from "../hooks/getCookies";
import removeCookies from "../hooks/removeCookies";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);


export const AuthWrapper = () => {
  const navigate = useNavigate();
  let role = 'user';
  const [isProtected, setProtected] = useState(false);

  
  async function checkProtected (){
    let userData = {
      jwt : getCookies('jwt'),
      };
      const response = await fetch("http://127.0.0.1:5001/api/v1/users/protect", {
      method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
  
      })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
              if (data.status === 'success') {
                setProtected(true);
              } 
              else {
                setProtected(false);
              }
            });
            }

    


  const [user, setUser] = useState({
    name: localStorage.getItem('name'),
    role: localStorage.getItem('role'),
    _id : localStorage.getItem('_id'),
    isAuthenticated: getCookies('jwt') ? true : false
  });
  
  const [selectedChat, setSelectedChat] = useState([]);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    checkProtected();
    console.log("use effect", isProtected);
   }, []);  

  // const checkProtected = async () => {
  //     let userData = {
  //       jwt : getCookies('jwt'),
  //       };
  //       const response = await fetch("http://127.0.0.1:5001/api/v1/users/protect", {
  //       method: "post",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(userData),
    
  //       })
  //           .then((response) => response.json())
  //           .then((data) => {
  //             console.log("yahan wala", data.status);
  //             if(data.status === 'fail'){
  //               // // setProtected(false);
  //               // setUser("", false);
  //               // navigate("/home");
  //               return false;

  //             }
  //             else{
  //               console.log('idhar');
  //               // navigate("/dashboard");
  //               // // setProtected(true);
  //               // setUser("", true);
  //               return true;
  //             }
  //             }   
  //      );
  // }

  // useEffect(async () => {
  //   checkProtected();
  //   console.log("kuch to", user.isAuthenticated);
     
  // }, []);
  

  const login = async (email, password) => {
    let userData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://127.0.0.1:5001/api/v1/users/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          return new Promise((resolve, reject) => {

            if (data.status === "success") {
              const tken = data.token;
              removeCookies("jwt");
              localStorage.setItem('name', data.data.user.name);
              localStorage.setItem('role', data.data.user.role);
              localStorage.setItem('_id', data.data.user._id);
              // console.log("user", data.data.user);
              setUser({ user: email,role: data.data.user.role, isAuthenticated: true });
              setCookies("jwt", tken);
              if(data.data.user.role === 'user'){
                navigate("/dashboard");
              }

              else if(data.data.user.role === 'lawyer'){
                role = 'lawyer'
                navigate("/dashboardLawyer");
              }
              resolve("success");
            } else {
              setUser({ user: "",role: "", isAuthenticated: false });
              reject("Invalid Credentails!!");
            }
          });
        });
    } catch (err) {
      console.log(err);
      setUser({ user: "",role:"", isAuthenticated: false });
      alert("Invalid Credentials!!");
    }
  };



  const logout = () => {
    removeCookies("jwt");
    setUser({ user: "",role:"", isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, selectedChat, setSelectedChat, chats, setChats}}>
      <>
        {/* <Navbar /> */}
        <RenderRoutes />
        {user.isAuthenticated && <ChatIcon />}
      </>
    </AuthContext.Provider>
  );

 
};
