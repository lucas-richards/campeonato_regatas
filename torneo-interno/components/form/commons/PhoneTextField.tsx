import React from "react";
import classes from "./inputcommons.module.scss";
import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface PhoneProps {
  name: string;
  control: Control;
  label: string;
}

const PhoneTextField = (props: PhoneProps) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      rules={{
        required: true,
        pattern: /^[\d]*$/,
        maxLength: 10,
        minLength: 8,
      }}
      render={({ field, fieldState: { invalid, isDirty } }) => (
        <TextField
          label={props.label}
          variant="standard"
          error={isDirty && invalid}
          {...field}
          fullWidth
        />
      )}
    />
  );
};

export default PhoneTextField;
