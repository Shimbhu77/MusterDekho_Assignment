import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, setData, toggleTask } from "../Redux/TaskSlice";
import { Link } from "react-router-dom";
import { setAuthenticated } from "../Redux/AuthSlice";

export default function Home() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.tasks.tasks);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [completed, setCompleted] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [username, setUsername] = useState("");

  const bearerToken = localStorage.getItem("jwtToken");

  const fetchData = useCallback(() => {
    fetch("http://localhost:8888/app/my-tasks/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jsondata) => {
        // console.log(jsondata);
        dispatch(setData(jsondata));

        fetchUsername();
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [bearerToken, dispatch]);

  useEffect(() => {
    // console.log("home.js data loading");
    fetchData();
  }, [bearerToken]);

  const handleDeleteTask = (taskId) => {
    fetch(`http://localhost:8888/app/delete-task/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((response) => {
        if (response.status === 202) {
          alert("Task deleted successfully.");
          dispatch(deleteTask(taskId));
        } else {
          alert("Task deletion failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleMarkCompletedTask = (taskId) => {
    let url = "";

    if (!completed) {
      url = `http://localhost:8888/app/mark-task-as-completed/${taskId}`;
    } else {
      url = `http://localhost:8888/app/mark-task-as-incompleted/${taskId}`;
    }

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((response) => {
        if (response.status === 202) {
          dispatch(toggleTask(taskId));
          setCompleted(!completed); // Toggle completed state
          alert(
            `Task ${completed ? "marked pending" : "completed"} successfully.`
          );
        } else {
          alert("Task completion marked failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSearch = () => {
    fetch(`http://localhost:8888/app/tasks/search/${keyword}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((response) => {
        if (response.status === 202) {
          return response.json(); // Parse the response JSON
        } else {
          throw new Error("Task Fetching failed");
        }
      })
      .then((newData) => {
        // Dispatch the data to Redux after parsing
        dispatch(setData(newData));

        console.log(newData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const filterBasedOnTaskCompletionStatus = (status) => {
    let url = "";

    if (status === "completed") {
      url = "http://localhost:8888/app/tasks/filter-completed-tasks";
    } else if (status === "pending") {
      url = "http://localhost:8888/app/tasks/filter-pending-tasks";
    }

    if (status === "completed" || status === "pending") {
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
        .then((response) => {
          if (response.status === 202) {
            return response.json(); // Parse the response JSON
          } else {
            throw new Error("Task Fetching failed");
          }
        })
        .then((newData) => {
          // Dispatch the data to Redux after parsing
          dispatch(setData(newData));

          console.log(newData);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      fetchData();
    }
  };

  const filterBasedOnDueDate = (duedate) => {
    const url = `http://localhost:8888/app/tasks/filter-by-due-date/${duedate}`;

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((response) => {
        if (response.status === 202) {
          return response.json(); // Parse the response JSON
        } else {
          throw new Error("Task Fetching failed");
        }
      })
      .then((newData) => {
        // Dispatch the data to Redux after parsing
        dispatch(setData(newData));

        console.log(newData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // console.log(duedate);
  };
  const fetchUsername = () => {
    const url = `http://localhost:8888/app/logged-in/user`;

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // console.log(response);
          return response.json(); // Parse the response JSON
        } else {
          throw new Error("Task Fetching failed");
        }
      })
      .then((newData) => {
        setUsername(newData.username);
        dispatch(setAuthenticated(true));
        // console.log(newData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="container">
        <h3 className="mt-4 my-5">Welcome to Task App : {username}</h3>
      </div>
      <div className="container my-1 ">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Title or Description words"
            value={keyword}
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            onChange={(event) => {
              setKeyword(event.target.value);
            }}
          />
          <button
            className="btn btn-outline-primary"
            type="button"
            id="button-addon2"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="container my-1">
        <div className="input-group mb-3">
          <select
            className="form-select"
            aria-label="Select Task Status"
            onChange={(event) => {
              filterBasedOnTaskCompletionStatus(event.target.value);
            }}
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <input
            type="date"
            className="form-control"
            onChange={(event) => {
              filterBasedOnDueDate(event.target.value);
            }}
          />

          <button
            className="btn btn-outline-primary"
            type="button"
            id="button-addon2"
            onClick={() => {
              fetchData();
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="container my-1">
        {data.map((item) => (
          <div className="container border my-2" key={item.taskId}>
            <div className="row align-items-center justify-content-start">
              <div className="col">{item.title}</div>
              <div className="col-auto">
                <Link
                  to={`/view/${item.taskId}`}
                  className="btn btn-primary me-2 my-2"
                >
                  View
                </Link>
                <Link
                  to={`/update/${item.taskId}`}
                  className="btn btn-warning me-2 my-2"
                >
                  Update
                </Link>
                <button
                  type="button"
                  className="btn btn-danger me-2 my-2"
                  onClick={() => handleDeleteTask(item.taskId)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-info my-2"
                  onClick={() => handleMarkCompletedTask(item.taskId)}
                >
                  {item.completed ? "Status : Completed" : "Status : Pending"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
