import React, { useState } from "react";
import InputForm from "../inputForm/inputForm";
import OutputPanel from "../outputPanel/outputPanel";

function Display() {
  const [data, setData] = useState("");

  return (
    <>
      <div>
        <h1>Book of Hour database</h1>
        <h3>A video game developed by WeatherFactory</h3>
      </div>
      <div style={{ height: "2rem" }}></div>
      <InputForm setData = {setData} />
      <div style={{ height: "2rem" }}></div>
      <OutputPanel data = {data} />
    </>
  );
}

export default Display;
