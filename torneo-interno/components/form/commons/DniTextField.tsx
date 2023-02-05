import React from "react";
import classes from "./inputcommons.module.scss";
import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface DniProps {
  name: string;
  control: Control;
}

const DniTextField = (props: DniProps) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      rules={{
        required: true,
        pattern: /^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/,
        maxLength: 8,
        minLength: 6,
      }}
      render={({ field, fieldState: { invalid, isDirty } }) => (
        <TextField
          label="DNI"
          variant="standard"
          error={isDirty && invalid}
          {...field}
          fullWidth
        />
      )}
    />
  );
};

export default DniTextField;
