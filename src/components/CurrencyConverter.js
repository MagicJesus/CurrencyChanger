import React from "react";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import CurrencySelector from "./CurrencySelector";
import { round } from "mathjs";

const CurrencyConverter = () => {
  const [currency, setCurrency] = useState("/gbp");
  const [code, setCode] = useState("");
  const [amount, setAmount] = useState("");
  const [amountPln, setAmountPln] = useState("");
  const [kurs, setKurs] = useState(0);

  function handleChange(event) {
    try {
      let amount = parseFloat(event.target.value);
      console.log(amount);
      if (!Number.isNaN(amount)) {
        setAmount(amount);
        setAmountPln(round(amount * kurs, 3));
      } else {
        setAmount("");
        setAmountPln("");
      }
    } catch (err) {
      window.alert(err);
    }
  }

  function handlePlnChange(event) {
    try {
      let amount = parseFloat(event.target.value);
      if (!Number.isNaN(amount)) {
        setAmount(round(amount / kurs, 3));
        setAmountPln(amount);
      } else {
        setAmount("");
        setAmountPln("");
      }
    } catch (err) {
      window.alert(err);
    }
  }

  return (
    <div className="field-wrapper">
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
    </div>
  );
};

export default CurrencyConverter;
