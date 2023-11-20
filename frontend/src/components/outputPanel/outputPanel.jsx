import React from "react";

function OutputPanel(props) {
  console.log(props);
  return (
    <div style={{ height: "40rem", width: "80rem", backgroundColor: "#313338" }}>
      {props.userInput}
    </div>
  );
}

export default OutputPanel;
