import React, { useEffect, useState } from "react";
import { Exchenge } from "./components/Exchenge";
import { Header } from "./components/Header";
import "./styles/App.css";

function App() {
  const [price, setPrice] = useState({
    USD: 0,
    EUR: 0,
  });
  const getInfoCurrency = () => {
    fetch(
      "https://api.fastforex.io/fetch-multi?from=UAH&to=EUR,USD,UAH&api_key=8b15bd23a7-7b5cebf241-r7epat"
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log("action");
        setPrice({
          USD: data.results.USD,
          EUR: data.results.EUR,
        });
      });
  };
  useEffect(() => getInfoCurrency(), []);
  return (
    <div className="App">
      <Header price={price} fun={getInfoCurrency} />
      <Exchenge />
    </div>
  );
}

export default App;
