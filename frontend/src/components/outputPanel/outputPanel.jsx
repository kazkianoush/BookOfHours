import React from "react";
import "./styles.css"

function OutputPanel(props) {
  let biggerArray = [];
  for (let j = 0; j < props.data.length; j++){
    let bigArray = [];
    for (let i = 0; i < props.data[j].length; i++) {
      let array = [];
      Object.keys(props.data[j][i]).forEach(function (keyName) {
        if (typeof props.data[j][i][keyName] === "object" && props.data[j][i][keyName] != null ) {
          array.push({ field: keyName, value: props.data[j][i][keyName].data });
        } else {
          array.push({ field: keyName, value: props.data[j][i][keyName] });
        }
      });
      bigArray.push(array);
    }
    biggerArray.push(bigArray);
  }
  console.log(biggerArray);
  
  let renderedTable = biggerArray.map(bigArray => {
    return(
      <>
      <div className="tableName">{parseTableName(bigArray[0][0].field.substring(0, bigArray[0][0].field.length - 2))}</div>
      <table width={"100%"}>
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
            <td key={cellIndex}>{parseTableValue(cell.value)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
      </>
    )
  })

  return (
    <div style={{ height: "auto", width: "80rem", backgroundColor: "#313338" }}>
      {renderedTable}
    </div>
  );
}

function parseTableName(string) {
  console.log(string);
  switch (string) {
    case 'memory':
      return 'Memory';
    case 'book':
      return 'Book';
    case 'people':
      return 'People';
  }
}

function parseTableValue(string) {
  if (string == '0') {
    return 'False';
  } else if (string == '1') {
    return 'True';
  } else
    return string;
}

export default OutputPanel;