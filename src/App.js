import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import PhotoValidation from "./Photovalidation";
import Successful from "./Successful";
import Unsuccess from "./Unsuccess";
import Error from "./Error";
import Dashboard from "./Dashboard";
import Logout from "./Logout";
import  Password  from "./Password";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/photovalidation" element={<PhotoValidation />}></Route>
        <Route path="/password" element={<Password />}></Route>

        <Route path="/success" element={<Successful />}></Route>
        <Route path="/unsuccess" element={<Unsuccess />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};
export default App;
