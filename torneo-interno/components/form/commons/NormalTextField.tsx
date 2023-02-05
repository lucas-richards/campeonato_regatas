import React, { FormEvent, useState } from "react";
import classes from "./inputcommons.module.scss";
import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface TextProps {
  name: string;
  label: string;
  control: Control;
}

const NormalTextField = (props: TextProps) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      rules={{
        required: true,
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

export default NormalTextField;
