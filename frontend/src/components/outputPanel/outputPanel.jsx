import React from "react";

function OutputPanel(props) {
  let bigArray = [];

  for (let i = 0; i < props.data.length; i++) {
    let array = [];
    Object.keys(props.data[i]).forEach(function (keyName) {
      if (typeof props.data[i][keyName] === "object" && props.data[i][keyName] != null ) {
        array.push({ field: keyName, value: props.data[i][keyName].data });
      } else {
        array.push({ field: keyName, value: props.data[i][keyName] });
      }
    });
    bigArray.push(array);
  }

  return (
    <div style={{ height: "40rem", width: "80rem", backgroundColor: "#313338" }}>
      <table>
        <thead>
          <tr>
            {bigArray.length > 0 &&
              bigArray[0].map((cell, cellIndex) => (
                <th key={cellIndex}>{cell.field}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {bigArray.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell.value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OutputPanel;