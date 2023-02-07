import React from "react";
import classes from "./inputcommons.module.scss";
import { Control, Controller } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export interface RadioOption {
  label: string;
  value: string;
}

interface RadioProps {
  name: string;
  control: Control;
  options: RadioOption[];
  label: string;
  row?: boolean;
}

const validatePositive = (value: string) => +value >= 0;

const RadioButtonField = (props: RadioProps) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      rules={{
        required: true,
        validate: validatePositive,
      }}
      render={({ field, fieldState: { invalid, isDirty } }) => (
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            {props.label}
          </FormLabel>
          <RadioGroup
            {...field}
            aria-labelledby="demo-radio-buttons-group-label"
            name={props.name}
            row={props.row}
          >
            {props.options.map((el) => (
              <FormControlLabel
                key={el.label}
                value={el.value}
                control={<Radio />}
                label={el.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    />
  );
};

export default RadioButtonField;
