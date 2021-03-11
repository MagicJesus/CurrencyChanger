import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "../App.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

const CurrencySelector = ({
  currency,
  setCurrency,
  setAmount,
  setAmountPln,
}) => {
  const classes = useStyles();

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
