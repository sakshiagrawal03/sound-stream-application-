// //we create this because we want this component use in each home,search,and upload so we just wrap them with protected in the app.routes.jsx
// import React, { useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Protected = ({ children }) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, {
//       withCredentials: true,
//     })
//     .then(response => {
//       console.log(response.data);
//     })
//     .catch(() => {
//       navigate("/login");
//     });
//   }, []);

//   return children;
// };

// export default Protected;
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, {
      withCredentials: true,
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(() => {
      navigate("/login");
    });
  }, []);

  return children;
};

export default Protected;
