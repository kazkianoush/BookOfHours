import React, { useState, useEffect } from "react";
import "./styles.css";
import FilterPanel from "./filterPanel";

function InputForm({ onItemsChange }) {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [insertInput, setInsertInput] = useState("");
  const [updateInput, setUpdateInput] = useState("");
  const [bookIDInput, setBookIDInput] = useState("");

  const [filterPanelOpen, setFilterPanel] = useState(true);
  const [advancedPanelOpen, setAdvancedPanel] = useState(true);

  const [selectedColumnsAllTable, setSelectedColumnsAllTable] = useState([
    [false, false, false, false, false, false, false, false],
    [true, false, false, false, false, false]
  ]);

  let numenOnly = 0;
  
  let list = {
    memoryID: 'ME111', // Example values, replace with actual user input
    memoryName: 'Memory: Taste hellooo',
    memorySources: 'Considering sustenance and beverages',
    memoryIsSound: 0,
    memoryIsOmen: 0,
    memoryIsPersistent: 0,
    memoryIsWeather: 0,
  };
  let listBook = {
      bookID:'',
      bookName : '',
      language:'',
      aspectID:'',
      memoryID:'',
      elementOfTheSoulID:'',
      numenID:'',
  }
  
  let selectedColumns = "";
  let initTableNames = ['memory','book', 'people']
  let tableNames = initTableNames;

  useEffect(() => {
    console.log("Items updated:", items);
    onItemsChange(items);
  }, [items]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSelectedColumns();
    tableNames = initTableNames.filter(filterTableName);
    let subUrl = ``;

    if (query != "") {
      subUrl = `/findByName/${query}`;
    }
    fetchAPI(e, subUrl);
  };

  const handleSelectedColumns = () => {
    const bookFilter = selectedColumnsAllTable[1];
    console.log(bookFilter);
    const columnArr = [];
    if (bookFilter[0]) {
      tableNames[1] = 'book';
    } else {
      tableNames[1] = null;
    }
    if (bookFilter[1]) {
      columnArr.push("bookID");
    }
    if (bookFilter[2]) {
      columnArr.push("bookName");
    }
    if (bookFilter[3]) {
      columnArr.push("language");
    }
    if (bookFilter[4]) {
      columnArr.push("memoryID");
    }
    if (bookFilter[5]) {
      columnArr.push("numenID");
    }
    selectedColumns = columnArr.join();
    console.log(tableNames);
    console.log(selectedColumns);
  }

  const filterTableName = (tableName) => {
    return tableName != null;
  }

  const fetchAPI = async (e, subUrl) => {
    e.preventDefault();
    if (numenOnly) {
      try {
        const numenData = await fetch(`http://localhost:3000/numen` + subUrl, { 
          credentials: "include",

          method: "GET",

          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         },

        }).then(response => response.json())
        onItemsChange([numenData]);
      } catch (e) {
      console.log(e);
      }
    } else if(selectedColumns){
        try {
          const allData = await Promise.all(tableNames.map(tableName =>
              fetch(`http://localhost:3000/${tableName}${subUrl}?selectedColumns=${selectedColumns}`, { 
                credentials: "include",
    
                method: "GET",
    
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
               },
              }).then(response => response.json())));
          onItemsChange(allData);
        }catch (e) {
          console.log(e);
        }
      } else {
        try {
          const allData = await Promise.all(tableNames.map(tableName =>
            fetch(`http://localhost:3000/${tableName}${subUrl}`, { 
                credentials: "include",
    
                method: "GET",
    
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
               },
              }).then(response => response.json())
              )
            );
          onItemsChange(allData);
        }catch (e) {
          console.log(e);
        }
      }
  };


  const handleFilterClick = () => {
    const filterPanel = document.getElementById('filter');
    setFilterPanel(!filterPanelOpen);
    if (filterPanelOpen) {
      filterPanel.style.display = 'block';
    } else {
      filterPanel.style.display = 'none';
    }
  }

  const handleFilterBookColumns = (filteredColumns) => {
    let updatedState = [...selectedColumnsAllTable];
    filteredColumns.map((state, i) => {
      updatedState[1][i] = state;
    })
    setSelectedColumnsAllTable(updatedState);
    console.log(updatedState);
  }

  const handleAdvancedClick = () => {
    const advancedPanel = document.getElementById('advanced');
    setAdvancedPanel(!advancedPanelOpen);
    if (advancedPanelOpen) {
      advancedPanel.style.display = 'block';
    } else {
      advancedPanel.style.display = 'none';
    }
  }

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
    listBook = {
      ...listBook,
      bookID: values[0] || list.memoryID,
      bookName: values[1] || list.memoryName,
      language: values[2] || list.memorySources,
      aspectID: values[3] || list.memoryIsSound,
      memoryID: values[4] || list.memoryIsOmen,
      elementOfTheSoulID: values[5] || list.memoryIsPersistent,
      numenID: values[6] || list.memoryIsWeather,
    };
    console.log(list)
    fetchAPIInsert(listBook);
  };

  const fetchAPIInsert = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/book", {
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

    listBook = {
      ...listBook,
      bookID: values[0] || list.memoryID,
      bookName: values[1] || list.memoryName,
      language: values[2] || list.memorySources,
      aspectID: values[3] || list.memoryIsSound,
      memoryID: values[4] || list.memoryIsOmen,
      elementOfTheSoulID: values[5] || list.memoryIsPersistent,
      numenID: values[6] || list.memoryIsWeather,
    };
    fetchAPIUpdate(listBook);
  };
  
  const fetchAPIUpdate = async (data) => {
    try {
      const response = await fetch(`http://localhost:3000/book/findByID/${data.bookID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`Update request failed with status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log("Update request successful", responseData);
    } catch (error) {
      console.error("Error during update request:", error.message);
    }
  };
  const handleSubmitDELETE = (e) => {
    e.preventDefault();
    handleDelete(e);
  };
  const handleDelete = async () => {
    console.log(bookIDInput)
    try {
      const response = await fetch(`http://localhost:3000/book/findByID/${bookIDInput}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Delete request failed with status: ${response.status}`);
      }
  
      console.log("Delete request successful");
      // You may want to update your state or perform additional actions after a successful delete
    } catch (error) {
      console.error("Error during delete request:", error.message);
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
             <button className="col" type="button" onClick={handleFilterClick}>Filter</button>
             <button className="col" type="button" onClick={handleAdvancedClick}>Advanced</button>
          </form>
          <div id="filter" className="filterPanel">
            <FilterPanel bookColumns = {handleFilterBookColumns}/>
            </div>
          <div id="advanced" className="advancedPanel">
            Totally Working Advanced
            </div>
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
          <h2>DELETE</h2>
          {}
          <form onSubmit={handleSubmitDELETE}>
            {}
            <input
              className="input-form"
              type="text"
              placeholder="Enter DELETE"
              value={bookIDInput}
              onChange={(e) => setBookIDInput(e.target.value)}
            />
            <button className="col">DELETE</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InputForm;