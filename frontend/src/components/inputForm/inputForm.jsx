import React, { useState } from "react";
import "./styles.css";

function InputForm(props) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(query);
    fetchAPI(e);
    
  };
  const fetchAPI = async (e) =>{
    e.preventDefault();
    try{
      const allData = await Promise.all(['memory', 'book'].map(tableName =>
        fetch(`http://localhost:3000/${tableName}/${query}`, { 
            credentials: "include",
            
            method: "GET",
      
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
           },
          
          })
          .then(response => response.json())
          )
        );
      console.log(allData);
      props.setData(allData);
    //   const response =  fetch(`http://localhost:3000/book/${query}`, { 
    //   credentials: "include",
      
    //   method: "GET",

    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //  },
    
    // });
    //   // const data = await response.json();
    //   // console.log(data);
    //   response.then(responses => responses.json().then(data => ({
    //     data: data
    //   }))).then(res => {
    //     console.log(res.data.length);
    //     console.log(res.data);
    //     props.setData(res.data);
    //     }
    //   )
    }catch (e) {
      console.log(e);

    }
  } 

  return (
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
        </form>
      </div>
      <button className="col">Filter</button>
      <button className="col">Advanced</button>
    </div>
  );
}

export default InputForm;
