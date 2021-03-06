import React from "react";
import { useEffect } from "react";
import { api } from "../services/api";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CurrencySelector = ({
  currency,
  setCode,
  setKurs,
  setCurrency,
  setAmount,
  setAmountPln,
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (currency !== "") {
      api
        .get(currency)
        .then((res) => {
          if (res.status === 200) {
            setCode(res.data.code);
            setKurs(res.data.rates[0].mid);
          }
        })
        .catch((err) => window.alert(err));
    }
  });

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Currency</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={currency}
        onChange={(e) => {
          setCurrency(e.target.value);
          setAmountPln("");
          setAmount("");
        }}
        label="Currency"
      >
        <MenuItem value="/gbp">GBP</MenuItem>
        <MenuItem value="/usd">USD</MenuItem>
        <MenuItem value="/chf">CHF</MenuItem>
        <MenuItem value="/eur">EUR</MenuItem>
        <MenuItem value="/czk">CZK</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CurrencySelector;
