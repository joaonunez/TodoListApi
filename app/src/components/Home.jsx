import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [tareasArray, setTareas] = useState([]);

  
  const getTareas = () => {
    fetch("https://playground.4geeks.com/todo/users/joaodev", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => setTareas(data.todos))
    .catch((error) => console.log(error));
  };

  useEffect(() => {
    getTareas();
  }, []);

  const addTarea = (label) => {
    const newTarea = {
      label: label,
      is_done: false
    };
  
    fetch("https://playground.4geeks.com/todo/todos/joaodev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(newTarea),
    })
      .then((response) => {
        console.log('Response:', response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data:', data);
        getTareas(); 
      })
      .catch((error) => console.log("Error:", error.message));
  };

  return (
    <div className="container">
      <h1>Gestión De Tareas</h1>
      <ul>
        <li>
          <input
            type="text"
            placeholder="Ingresa Una Nueva Tarea"
            onChange={(escrito) => setInputValue(escrito.target.value)}
            value={inputValue}
            onKeyDownCapture={(tecla) => {
              if (tecla.key === "Enter") {
                addTarea(inputValue);
                setInputValue("");
              }
            }}
          ></input>
        </li>
        {tareasArray.map((tarea) => (
          <li key={tarea.id}>
            {tarea.label}
            <FontAwesomeIcon
              icon={faTrash}
              className="fa-trash"
            />
          </li>
        ))}
      </ul>
      <div>{tareasArray.length} Tareas.</div>
    </div>
  );
};
