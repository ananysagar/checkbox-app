import { useState } from "react";
import "./App.css";
import { toppings } from "./toppings";

function App() {
  const [allChecked, setAllChecked] = useState(false)
  const [checkedList, setCheckedList] = useState([])

  const handleChange = (e) => {
    const {name, checked} = e.target;
    if(checked) {
      setCheckedList((prev) => [...prev, name])
    } else {
      setCheckedList((prev) => prev.filter((item) => item!== name))
    }
  }

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setAllChecked(isChecked)

    if(isChecked) {
      setCheckedList(toppings.map((item) => item.name))
    } else {
      setCheckedList([])
    }
  }

  return (
    <div className="App">
      <h1>Select Toppings</h1>
      <div className="checkbox-app">
        <div className="toppings-list">
          <input type="checkbox" id="selectAll" onChange={handleSelectAll} checked={allChecked}/>
          <label htmlFor="selectAll">Select All</label>
          {toppings.map((element, name) => {
            return (
              <div className="list-items" key={element.name}>
                <input type="checkbox" name={element.name} onChange={handleChange} checked={checkedList.includes(element.name)}/>
                <div>{element.name}</div>
                <div><span>:  Rs </span>{element.price}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
