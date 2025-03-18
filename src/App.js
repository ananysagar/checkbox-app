import { useEffect, useState } from "react";
import "./App.css";
import { toppings } from "./toppings";

function App() {
  const [allChecked, setAllChecked] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    const topping = toppings.find((item) => item.name === name);
    if (!topping) return;

    if (checked) {
      setCheckedList((prev) => [...prev, name]);
      setTotalPrice((prev) => prev + topping.price);
    } else {
      setCheckedList((prev) => prev.filter((item) => item !== name));
      setTotalPrice((prev) => prev - topping.price);
    }
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setAllChecked(isChecked);

    if (isChecked) {
      setCheckedList(toppings.map((item) => item.name));
      setTotalPrice(toppings.reduce((acc, curr) => acc + curr.price, 0));
    } else {
      setCheckedList([]);
      setTotalPrice(0);
    }
  };

  useEffect(() => {
    if (checkedList.length === toppings.length) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [checkedList]);

  return (
    <div className="App">
      <h1>Select Toppings</h1>
      <div className="checkbox-app">
        <div className="toppings-list">
          <input
            type="checkbox"
            id="selectAll"
            onChange={handleSelectAll}
            checked={allChecked}
          />
          <label htmlFor="selectAll">Select All</label>
          {toppings.map((element, name) => {
            return (
              <div className="list-items" key={element.name}>
                <input
                  type="checkbox"
                  name={element.name}
                  onChange={handleChange}
                  checked={checkedList.includes(element.name)}
                />
                <div>{element.name}</div>
                <div>
                  <span>: Rs </span>
                  {element.price}
                </div>
              </div>
            );
          })}
          <div className="total">
            <div>Total </div>
            <div>
              <span>: Rs </span>
              {totalPrice}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
