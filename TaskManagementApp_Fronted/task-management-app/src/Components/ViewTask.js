import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewTask = () => {
  const { taskId } = useParams();
  const data = useSelector((state) => state.tasks.tasks);

  const task = data.find((t) => t.taskId == taskId);

  const [name, setName] = useState("");

  const navigate = useNavigate();

  if (!task) {
    return <div className="container">Task not found</div>;
  }

  const bearerToken = localStorage.getItem("jwtToken");
  if (bearerToken) {
    console.log("Jwt token is found.");
  } else {
    console.log("JWT Token not found in local storage.");
  }

  const handleAssign = () => {
    // Make a POST request to Assigned Task API endpoint
    fetch(`http://localhost:8888/app/tasks/assigned-task/${taskId}/${name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          alert(
            "Enter Correct Username because this username does not exist: " +
              name
          );
          throw new Error("Network response was not ok");
        }
        alert("Assigned this task to Another User Successfully.");
        setName("");
        navigate('/');
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <>
      <div className="container mt-5">
        <h2>View Task</h2>
        <div className="row mt-3">
          <div className="col-md-4">
            <strong>Task Id:</strong>
          </div>
          <div className="col-md-8">{task.taskId}</div>
        </div>
        <div className="row mt-3">
          <div className="col-md-4">
            <strong>Title:</strong>
          </div>
          <div className="col-md-8">{task.title}</div>
        </div>
        <div className="row mt-3">
          <div className="col-md-4">
            <strong>Description:</strong>
          </div>
          <div className="col-md-8">{task.description}</div>
        </div>
        <div className="row mt-3">
          <div className="col-md-4">
            <strong>Completed:</strong>
          </div>
          <div className="col-md-8">{task.completed ? "Yes" : "No"}</div>
        </div>
      </div>

      <div className="container my-1 mt-5 ">
        <h3>Assigned This Task to Another User</h3>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Username of Another user "
            value={name}
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <button
            className="btn btn-outline-primary"
            type="button"
            id="button-addon2"
            onClick={handleAssign}
          >
            Assigned Task
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewTask;
