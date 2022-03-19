import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const [list, setList] = useState(["list1", "list2", "list3"]);
  const [listInfo, setListInfo] = useState([
    ["person", "name", "haircolor"],
    ["planet", "size", "color"],
    ["gun", "power", "color"],
  ]);
  const [entity, setEntity] = useState([
    { name: "name1", age: "age1", haircolor: "brown" },
  ]);
  const [num, setNum] = useState(1);

  const p = (a) => {
    console.log(a);
  };

  useEffect(() => {
    axios.get("https://swapi.dev/api/").then((response) => {
      const keys = Object.keys(response.data);
      setList(keys);
    });
  }, [list]);

  const onClickHandler = (event) => {
    event.preventDefault();

    console.log("calling axios people");
    axios.get("https://swapi.dev/api/people/1/").then((response) => {
      console.log(response.data);
      setEntity(response.data);
    });
  };

  return (
    <div className="App">
      <h1>Luke API Walker</h1>
      <form>
        <select name="x_type" className="options">
          {list.map((item, i) => {
            return (
              <option
                className="options"
                key={i}
                value={item}
              >
                {item}
              </option>
            );
          })}
        </select>
        <input name="x_num" className="options" type="number" min="1" max="10" onChange={(event)=>{setNum(event.target.value)}}/>
        <button className="btn btn-primary mx-4" onClick={onClickHandler}>
          Go
        </button>
      </form>
      <div className="box">
        {list.map((item, i) => {
          return <p key={i}>{item}</p>;
        })}
      </div>
      <div className="box">
        {entity.map((item, i) => {
          return (
            <>
              {<p>{item.name}</p>}
              {<p>{item.haircolor}</p>}
            </>
          );
        })}
      </div>
      <div className="box">
        <p>{num}</p>
      </div>
    </div>
  );
}

export default App;
