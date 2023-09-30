import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import TaskForm from "./Components/TaskForm";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import ViewTask from "./Components/ViewTask";
import UpdateTask from "./Components/UpdateTask";
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="App">
      <Router>
        {/* Conditionally render the Navbar when authenticated */}
        {isAuthenticated && <Navbar />}

        <Routes>
          {!isAuthenticated && (
            <Route exact path="/" element={<Navigate to="/sign-in" />} />
          )}
          {isAuthenticated && (
            <Route exact path="/" element={<Navigate to="/home" />} />
          )}
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/sign-in" element={<SignIn />} />

          {/* Protected routes */}
          {isAuthenticated && (
            <>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/create-task" element={<TaskForm />} />
              <Route exact path="/view/:taskId" element={<ViewTask />} />
              <Route exact path="/update/:taskId" element={<UpdateTask />} />
            </>
          )}

          {!isAuthenticated && (
            <Route exact path="/*" element={<Navigate to="/sign-in" />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
