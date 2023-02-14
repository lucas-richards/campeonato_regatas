import React from "react";
import classes from "./inputcommons.module.scss";
import { Control, Controller } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  name: string;
  control: Control;
  options: SelectOption[];
  label: string;
}

const validatePositive = (value: string) => +value >= 0;

const SelectTextField = (props: SelectProps) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      rules={{
        required: true,
        validate: validatePositive,
      }}
      render={({ field, fieldState: { invalid, isDirty } }) => (
        <FormControl fullWidth variant="standard">
          <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
          <Select
            {...field}
            aria-labelledby="demo-Select-buttons-group-label"
            name={props.name}
          >
            {props.options.map((el) => (
              <MenuItem key={el.label} value={el.value}>
                {el.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default SelectTextField;
