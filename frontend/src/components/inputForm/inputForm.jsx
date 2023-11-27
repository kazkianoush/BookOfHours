import React, { useState, useEffect } from "react";
import "./styles.css";

function InputForm({ onItemsChange }) {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [insertInput, setInsertInput] = useState("");
  const [updateInput, setUpdateInput] = useState("")

  let list = {
    memoryID: 'ME111', // Example values, replace with actual user input
    memoryName: 'Memory: Taste hellooo',
    memorySources: 'Considering sustenance and beverages',
    memoryIsSound: 0,
    memoryIsOmen: 0,
    memoryIsPersistent: 0,
    memoryIsWeather: 0,
  };

  useEffect(() => {
    console.log("Items updated:", items);
    onItemsChange(items);
  }, [items]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("First form submitted:", query);
    fetchAPI(e);
  };

  const fetchAPI = async (e) => {
    e.preventDefault();
    try {
      const response = fetch(`http://localhost:3000/memory/${query}`, {
        credentials: "include",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      response
        .then((responses) =>
          responses.json().then((data) => ({
            data: data,
          }))
        )
        .then((res) => {
          console.log(res.data.length);
          console.log(res.data);

          setItems(res.data);
        });
    } catch (e) {
      console.log(e);
    }
  };




  const handleSubmitINSERT = (e) => {
    e.preventDefault();
    // Split the input value by commas and assign to list properties
    const values = insertInput.split(",").map((value) => value.trim());
    list = {
      ...list,
      memoryID: values[0] || list.memoryID,
      memoryName: values[1] || list.memoryName,
      memorySources: values[2] || list.memorySources,
      memoryIsSound: values[3] || list.memoryIsSound,
      memoryIsOmen: values[4] || list.memoryIsOmen,
      memoryIsPersistent: values[5] || list.memoryIsPersistent,
      memoryIsWeather: values[6] || list.memoryIsWeather,
    };
    fetchAPIInsert(list);
  };

  const fetchAPIInsert = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/memory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(
          `Insert request failed with status: ${response.status}`
        );
      }

      console.log("Insert request successful");
    } catch (error) {
      console.error("Error during insert request:", error.message);
    }
  };



  const handleSubmitUPDATE = (e) => {
    e.preventDefault();
    // Split the input value by commas and assign to list properties
    const values = updateInput.split(",").map((value) => value.trim());
    list = {
      ...list,
      memoryID: values[0] || list.memoryID,
      memoryName: values[1] || list.memoryName,
      memorySources: values[2] || list.memorySources,
      memoryIsSound: values[3] || list.memoryIsSound,
      memoryIsOmen: values[4] || list.memoryIsOmen,
      memoryIsPersistent: values[5] || list.memoryIsPersistent,
      memoryIsWeather: values[6] || list.memoryIsWeather,
    };
    fetchAPIUpdate(list);
  };
  
  const fetchAPIUpdate = async (data) => {
    console.log(data)
    try {
      const response = await fetch(`http://localhost:3000/memory/${data.memoryID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(
          `Update request failed with status: ${response.status}`
        );
      }
  
      console.log("Update request successful");
    } catch (error) {
      console.error("Error during update request:", error.message);
    }
  };
  


  
  return (
    <div className="input-form-container">
      <div className="parent">
        <div className="col">
          <form onSubmit={handleSubmit}>
            <input
              className="input-form"
              type="text"
              placeholder="Enter keywords here"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="col">Filter</button>
            <button className="col">Advanced</button>
          </form>
          <h2>INSERT</h2>
          {}
          <form onSubmit={handleSubmitINSERT}>
            {}
            <input
              className="input-form"
              type="text"
              placeholder="Enter INSERT"
              value={insertInput}
              onChange={(e) => setInsertInput(e.target.value)}
            />
            <button className="col">INSERT</button>
          </form>
          <h2>UPDATE</h2>
          {}
          <form onSubmit={handleSubmitUPDATE}>
            {}
            <input
              className="input-form"
              type="text"
              placeholder="Enter UPDATE"
              value={updateInput}
              onChange={(e) => setUpdateInput(e.target.value)}
            />
            <button className="col">UPDATE</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InputForm;
