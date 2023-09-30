import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setAuthenticated } from "../Redux/AuthSlice";

export default function SignIn() {
  // Define state variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // console.log("username : " + username);
  // console.log("password : " + password);

  const signIn = () => {
    const base64Credentials = btoa(`${username}:${password}`);

    const user = {
      username: username,
      password: password,
    };

    // Make a POST request to sign up API endpoint
    fetch("http://localhost:8888/app/sign-in", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${base64Credentials}`,
      },
      // body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          alert("Enter correct Username and Password");
          throw new Error("Enter correct Username and Password");
        }
        const jwtToken = response.headers.get("Authorization");

        // console.log("jwt token , ", response.headers.get("Authorization"));

        localStorage.setItem("jwtToken", jwtToken);

        return response.json();
      })
      .then((data) => {
        alert("User Login Successfully.");
        // Clear the form after successful submission

        console.log("data  : " + JSON.stringify(data));

        setPassword("");
        setUsername("");

        dispatch(setAuthenticated(true));

        navigate("/home");
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        alert(error);
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <>
      <div className="container">
        <h2>Sign In</h2> {/* Add a heading */}
        <div className="mb-3 mt-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter your username here"
            value={username} // Connect value to state
            onChange={(e) => setUsername(e.target.value)} // Update state on input change
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="exampleFormControlInput2" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleFormControlInput2"
            placeholder="Enter password which contains 1 lowercase, 1 uppercase, 1 number, and 1 special character and its length should be at least 8 characters"
            value={password} // Connect value to state
            onChange={(e) => setPassword(e.target.value)} // Update state on input change
          />
        </div>
        <button type="button" className="btn btn-primary mt-3" onClick={signIn}>
          Login
        </button>
        <p>
          Don't have an account? <Link to="/sign-up">Sign Up</Link>{" "}
          {/* Add a link to the Sign-Up page */}
        </p>
      </div>
    </>
  );
}
