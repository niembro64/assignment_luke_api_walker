import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const [entity, setEntity] = useState([]);
  const [list, setList] = useState(["person", "planet", "gun"]);

  const p = (a) => {
    console.log(a);
  };

  const fetchInfo = (event) => {
    event.preventDefault();

    // console.log("calling axios list");
    axios.get("https://swapi.dev/api/").then((response) => {
      p(response.data);
      const keys = Object.keys(response.data);
      setList(keys);
    });

    // console.log("calling axios people");
    // axios.get("https://swapi.dev/api/people/1/").then((response) => {
    //   console.log(response.data);
    //   setEntity(response.data);
    // });
  };

  return (
    <div className="App">
      <h1>Luke API Walker</h1>
      <form>
        <input type="text" />
        <button className="btn btn-primary mx-4" onClick={fetchInfo}>
          Go
        </button>
      </form>
      {list.map((item, i) => {
        return <p key={i}>{item}</p>;
      })}
    </div>
  );
}

export default App;
