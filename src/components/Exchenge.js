import React, { useEffect, useState } from "react";
import "../styles/Exchenge.css";

export const Exchenge = () => {
  const [active, setActive] = useState("BUY");
  const getInfoCurrency = (val) => {
    fetch(
      `https://api.fastforex.io/fetch-multi?from=${val}&to=EUR,USD,UAH&api_key=8b15bd23a7-7b5cebf241-r7epat`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setCurrency({
          ...currency,
          USD: {
            value: data.results.USD,
          },
          EUR: {
            value: data.results.EUR,
          },
          UAH: {
            value: data.results.UAH,
          },
        });
        console.log(currency);
      });
  };
  useEffect(() => getInfoCurrency("UAH"), []);
  const [currency, setCurrency] = useState({
    USD: {
      name: "USD",
      value: 1,
    },
    EUR: {
      name: "EUR",
      value: 1,
    },
    UAH: {
      name: "UAH",
      value: 1,
    },
  });
  const [nameCurrencyBUY, setNameCurrencyBUY] = useState(currency.UAH.name);
  const [nameCurrencySELL, setNameCurrencySEll] = useState(currency.USD.name);
  const [valueSEll, setValueSell] = useState(0);
  const [valueBUY, setValueBUY] = useState(1);

  const changeHandlerSelectBUY = (event) => {
    setNameCurrencyBUY(event.target.value);
    switch (event.target.value) {
      case "USD":
        getInfoCurrency("USD");
        break;
      case "EUR":
        getInfoCurrency("EUR");
        break;
      default:
        getInfoCurrency("UAH");
    }
  };

  const changeHandlerSelectSEll = (event) => {
    console.log(event.target.value);
    setNameCurrencySEll(event.target.value);
  };

  const calcValue = (event) => {
    if (event.target.name === "BUY") {
      setValueBUY(event.target.value);
      setActive("BUY");
      setValueSell(valueBUY * currency[nameCurrencySELL].value);
    } else {
      setValueSell(event.target.value);
      setActive("SELL");
    }
  };

  useEffect(() => {
    active === "BUY"
      ? setValueSell((valueBUY * currency[nameCurrencySELL].value).toFixed(3))
      : setValueBUY(
          (valueSEll * (1 / currency[nameCurrencySELL].value)).toFixed(3)
        );
  }, [
    valueSEll,
    currency,
    nameCurrencyBUY,
    valueBUY,
    currency,
    nameCurrencySELL,
  ]);

  return (
    <div className="exchenger">
      <label>leftAD</label>
      <form>
        <h1>
          Перевести {nameCurrencyBUY} в {nameCurrencySELL}
        </h1>
        <div className="formExchenge">
          <div className="BUY">
            <input
              value={valueBUY}
              name="BUY"
              onChange={(event) => calcValue(event)}
            ></input>
            <select
              value={nameCurrencyBUY}
              onChange={(event) => changeHandlerSelectBUY(event)}
              className="SelectCurrency"
            >
              <option value={currency.EUR.name}>{currency.EUR.name}</option>
              <option value={currency.UAH.name}>{currency.UAH.name}</option>
              <option value={currency.USD.name}>{currency.USD.name}</option>
            </select>
          </div>
          <div className="SELL">
            <input
              value={valueSEll}
              name="SELL"
              onChange={(event) => calcValue(event)}
            ></input>
            <select
              value={nameCurrencySELL}
              onChange={(event) => changeHandlerSelectSEll(event)}
              className="SelectCurrency"
            >
              <option value={currency.EUR.name}>{currency.EUR.name}</option>
              <option value={currency.UAH.name}>{currency.UAH.name}</option>
              <option value={currency.USD.name}>{currency.USD.name}</option>
            </select>
          </div>
        </div>
      </form>
      <label>rightAD</label>
    </div>
  );
};
