import { createContext, useContext, useState } from "react";
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
  const [isprotected, setProtected] = useState(false);

  const checkProtected = async () => {
	let userData = {
		jwt : getCookies('jwt'),
	  };

    try {
      const response = await fetch("http://127.0.0.1:5001/api/v1/users/protect", {
		method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),

	  })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            setProtected(true);
			return isprotected;
          }
        });
    } catch (err) {
      console.log(err);
      setProtected(false);
	  return isprotected;
    }
  };

  const [user, setUser] = useState({
    name: "",
    isAuthenticated: checkProtected(),
  });



  

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
          // console.log("data", data);

          return new Promise((resolve, reject) => {
            if (data.status === "success") {
              const tken = data.token;
              console.log("token", tken);
              removeCookies("jwt");
              setUser({ name: email, isAuthenticated: true });
              setCookies("jwt", tken);
              navigate("/dashboard");
              resolve("success");
            } else {
              setUser({ name: "", isAuthenticated: false });
              reject("Invalid Credentails!!");
            }
          });
        });
    } catch (err) {
      console.log(err);
      setUser({ name: "", isAuthenticated: false });
      alert("Invalid Credentials!!");
    }
  };

  const logout = () => {
    removeCookies("jwt");
    setUser({ name: "", isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <>
        <Navbar />
        <RenderRoutes />
        {user.isAuthenticated && <ChatIcon />}
      </>
    </AuthContext.Provider>
  );
};
