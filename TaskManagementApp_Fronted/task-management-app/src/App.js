import "./App.css";
import Navbar from "./Components/Navbar";
import TaskForm from "./Components/TaskForm";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import the Route and Routes components
import Home from "./Components/Home";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import ViewTask from "./Components/ViewTask";
import UpdateTask from "./Components/UpdateTask";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/taskform" element={<TaskForm />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/view/:taskId" element={<ViewTask/>} />
          <Route path="/update/:taskId" element={<UpdateTask/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
