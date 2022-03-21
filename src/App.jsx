import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import React, { useEffect, useState, createElement } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const [list, setList] = useState([
    "list1",
    "list2",
    "list3",
    "list4",
    "list5",
  ]);
  const [entity, setEntity] = useState([
    {
      name: "name1",
      age: "age1",
      haircolor: "brown",
      four: "four",
      five: "five",
      six: "six",
    },
  ]);
  const [num, setNum] = useState(1);
  const [ent, setEnt] = useState("people");
  const [help, setHelp] = useState(true);

  const p = (a) => {
    console.log(a);
  };

  useEffect(() => {
    p("useEffect Running");
    axios.get("https://swapi.dev/api/").then((response) => {
      const keys = Object.keys(response.data);
      setList(keys);
    });
  }, []);

  const onClickHandler = (event) => {
    event.preventDefault();

    console.log(`calling axios ent: ${ent} num: ${num} `);
    // axios.get("https://swapi.dev/api/people/1/").then((response) => {
    axios
      .get("https://swapi.dev/api/" + ent + "/" + num + "/")
      .then((response) => {
        console.log(response.data);
        setEntity(response.data);
        setHelp(false);
      });
  };

  return (
    <div className="App">
      <h1>Luke API Walker</h1>
      <form>
        <select
          name="x_type"
          defaultValue="people"
          className="options"
          onChange={(event) => {
            setEnt(event.target.value);
          }}
        >
          {list.map((item, i) => {
            return (
              <option className="options" key={i} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <input
          name="x_num"
          className="options"
          type="number"
          min="1"
          max="100"
          defaultValue="1"
          onChange={(event) => {
            setNum(event.target.value);
          }}
        />
        <button className="btn btn-primary mx-4" onClick={onClickHandler}>
          Go
        </button>
      </form>
      {/* <div className="box">
        <p>Ent: {ent}</p>
        <p>Num: {num}</p>
      </div> */}
      {help ? (
        ""
      ) : (
        <div className="box">
          <h1>{Object.values(entity)[0]}</h1>
          <div className="pboy">
            <p>{Object.keys(entity)[1]}</p>
            <p>{Object.values(entity)[1]}</p>
          </div>
          <div className="pboy">
            <p> {Object.keys(entity)[2]}</p>
            <p> {Object.values(entity)[2]}</p>
          </div>
          <div className="pboy">
            <p> {Object.keys(entity)[3]}</p>
            <p>{Object.values(entity)[3]}</p>
          </div>
          <div className="pboy">
            <p>{Object.keys(entity)[4]}</p>
            <p>{Object.values(entity)[4]}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
