import React from "react";
import "../styles/Header.css";

export const Header = (props) => {
  const USD = 1 / props.price.USD;
  const EUR = 1 / props.price.EUR;
  // setInterval(() => props.fun(), 10000);
  // onChange={() => props.fun()}
  return (
    <header className="App-header">
      <h1 className="Name">Name</h1>
      <div className="price">
        <label>USD</label>
        <input value={USD.toFixed(5)} disabled={true} />
        <label>EUR</label>
        <input value={EUR.toFixed(5)} disabled={true} />
      </div>
    </header>
  );
};
