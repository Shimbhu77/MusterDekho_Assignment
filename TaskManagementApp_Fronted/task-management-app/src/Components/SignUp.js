import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

    // Define state variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signUp = ()=>{

    const user = {
        username: username,
        password: password
    }

     // Make a POST request to sign up API endpoint
     fetch("http://localhost:8888/app/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Handle the API response here 
          alert("User Registered Successfully.");
          // Clear the form after successful submission
          console.log(user);
          setPassword("");
          setUsername(" ");

          navigate('/sign-in');
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
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleFormControlInput2"
          placeholder="Enter password which contains 1 lowercase , 1 uppercase, 1 number and 1 special character and its length should at least 8 characters"
          value={password} // Connect value to state
          onChange={(e) => setPassword(e.target.value)} // Update state on input change
        />
      </div>

      <button
        type="button"
        className="btn btn-primary mt-3"
        onClick={signUp}
      >
        Register
      </button>
    </div>
  </>
  )
}
