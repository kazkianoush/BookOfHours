import React, { useState } from "react";
import "./styles.css";

function InputForm({ onQueryChange }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onQueryChange(query);
    alert(query);
  };

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
