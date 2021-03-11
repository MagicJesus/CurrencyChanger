import React from "react";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import CurrencySelector from "./CurrencySelector";
import { round } from "mathjs";
import { api } from "../services/api";
import MyPlot from "./MyPlot";

const CurrencyConverter = () => {
  const [currency, setCurrency] = useState("/gbp");
  const [code, setCode] = useState("");
  const [amount, setAmount] = useState("");
  const [amountPln, setAmountPln] = useState("");
  const [kurs, setKurs] = useState(0);
  const [historyRates, setHistoryRates] = useState([]);

  useEffect(() => {
    let currencyCode = currency.slice(1, 4).toUpperCase();

    if (currency !== "" && code !== currencyCode) {
      api
        .get(currency + "/last/30")
        .then((res) => {
          if (res.status === 200) {
            setHistoryRates(res.data.rates);
            setCode(res.data.code);
            setKurs(res.data.rates[res.data.rates.length - 1].mid);
          }
        })
        .catch((err) => window.alert(err));
    }
  });

  function handleChange(event) {
    let amountString = event.target.value;

    let decimalDigits = calculateDecimalDigits(amountString);

    try {
      let amount = parseFloat(amountString);

      if (
        !Number.isNaN(amount) &&
        amountString[amountString.length - 1] === "."
      ) {
        if (amountString.match(/\./g || []).length === 1) {
          setAmount(amountString);
          setAmountPln(round(amount * kurs, 4));
        }
      } else if (!Number.isNaN(amount)) {
        if (decimalDigits < 5) {
          setAmount(amount);
          setAmountPln(round(amount * kurs, 4));
        }
      } else {
        setAmount("");
        setAmountPln("");
      }
    } catch (err) {
      window.alert(err);
    }
  }

  function handlePlnChange(event) {
    let amountString = event.target.value;

    let decimalDigits = calculateDecimalDigits(amountString);

    try {
      let amount = parseFloat(amountString);
      if (
        !Number.isNaN(amount) &&
        amountString[amountString.length - 1] === "."
      ) {
        if (amountString.match(/\./g || []).length === 1) {
          setAmountPln(amountString);
          setAmount(round(amount / kurs, 4));
        }
      } else if (!Number.isNaN(amount)) {
        if (decimalDigits < 5) {
          setAmount(round(amount / kurs, 4));
          setAmountPln(amount);
        }
      } else {
        setAmount("");
        setAmountPln("");
      }
    } catch (err) {
      window.alert(err);
    }
  }

  function calculateDecimalDigits(string) {
    let counting = false;
    let ctr = 0;
    for (let i = 0; i < string.length; i++) {
      if (string[i] === ".") {
        counting = true;
      } else if (counting) {
        ctr += 1;
      }
    }
    return ctr;
  }

  return (
    <div>
      <div className="field">
        <CurrencySelector
          currency={currency}
          setCode={setCode}
          setKurs={setKurs}
          setCurrency={setCurrency}
          setAmount={setAmount}
          setAmountPln={setAmountPln}
        />
      </div>
      <div className="field">
        <TextField
          id="foreign"
          label={code}
          variant="outlined"
          value={amount}
          onChange={handleChange}
        />
      </div>
      <div className="field">
        <TextField
          id="domestic"
          label="PLN"
          variant="outlined"
          value={amountPln}
          onChange={handlePlnChange}
        />
      </div>
      <p>
        1 {code} = {kurs} PLN
      </p>
      <div>
        <MyPlot data={historyRates} code={code} />
      </div>
    </div>
  );
};

export default CurrencyConverter;
