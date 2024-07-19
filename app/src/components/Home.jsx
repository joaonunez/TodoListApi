import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import tareas from "../scripts/tareas";

const apiUrl = 'https://playground.4geeks.com/todo/users/joaodev';
export const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [tareasArray, setTareas] = useState(tareas);

  const borrarTarea = (index) => {
    const filtroTareas = tareasArray.filter((_, i) => i !== index);
    setTareas(filtroTareas);
  };

  return (
    <>
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
                  setTareas(tareasArray.concat(inputValue));
                  
                  setInputValue("");
                }
                
              }}
            ></input>
          </li>
          {tareasArray.map((tarea, index) => (
            <li key={index}>
              {tarea}
              <FontAwesomeIcon
                icon={faTrash}
                className="fa-trash"
                onClick={() => borrarTarea(index)}
              />
            </li>
            
          ))}
        </ul>
        <div>{tareasArray.length} Tareas.</div>
      </div>
    </>
  );
};
