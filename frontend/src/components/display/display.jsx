import React, { useState } from "react";
import InputForm from "../inputForm/inputForm";
import OutputPanel from "../outputPanel/outputPanel";

function Display() {
  const [submittedQuery, setSubmittedQuery] = useState("");

  const handleQueryChange = (newQuery) => {
    setSubmittedQuery(newQuery);
  };

  return (
    <>
      <div>
        <h1>Book of Hour database</h1>
        <h3>A video game developed by WeatherFactory</h3>
      </div>
      <div style={{ height: "2rem" }}></div>
      <InputForm onQueryChange={handleQueryChange} />
      <div style={{ height: "2rem" }}></div>
      <OutputPanel userInput={submittedQuery} />
    </>
  );
}

export default Display;
