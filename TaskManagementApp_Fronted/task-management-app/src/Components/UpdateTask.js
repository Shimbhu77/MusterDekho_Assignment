import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function UpdateTask() {
  // Define state variables
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState("");

  const navigate = useNavigate();

  const { taskId } = useParams();
  const data = useSelector((state) => state.tasks.tasks);

  const task = data.find((t) => t.taskId == taskId);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDesc(task.description);
      setDueDate(task.dueDate);
    }
  }, [task]);

  // Event handler for handling form submission
  const updateTask = () => {
    // Create a task object with the form data
    const task = {
      title: title,
      description: desc,
      dueDate: dueDate,
    };

    const bearerToken = localStorage.getItem("jwtToken");
    if (bearerToken) {
      console.log("Jwt token is found.");
    } else {
      console.log("JWT Token not found in local storage.");
    }

    // Make a POST request to your API endpoint
    fetch(`http://localhost:8888/app/update-task/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(task),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the API response here
        alert("Task Updated Successfully.");
        // Clear the form after successful submission
        console.log(task);
        setTitle("");
        setDesc("");
        setDueDate("");
        navigate('/');
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <>
      <div className="container">
        <div className="mb-3 mt-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Task Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter your Task Title"
            value={title} // Connect value to state
            onChange={(e) => setTitle(e.target.value)} // Update state on input change
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Task Description
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea2"
            rows="5"
            value={desc} // Connect value to state
            onChange={(e) => setDesc(e.target.value)} // Update state on input change
          ></textarea>
        </div>
        <div className="form-group">
          <label>Task Due Date</label>
          <input
            type="date"
            className="form-control"
            value={dueDate} // Connect value to state
            onChange={(e) => setDueDate(e.target.value)} // Update state on input change
          />
        </div>

        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={updateTask}
        >
          Update Task
        </button>
      </div>
    </>
  );
}
