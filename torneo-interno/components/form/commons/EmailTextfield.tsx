import React, { FormEvent, useState } from "react";
import classes from "./inputcommons.module.scss";
import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface EmailProps {
  name: string;
  control: Control;
}

const EmailTextfield = (props: EmailProps) => {
  const [validEmail, setValidEmail] = useState(false);
  const onChangeHandler = (event: any) => {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        event.currentTarget.value
      )
    ) {
      return setValidEmail(true);
    }
    return setValidEmail(false);
  };

  return (
    <Controller
      control={props.control}
      name={props.name}
      rules={{
        required: true,
        pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      }}
      render={({ field, fieldState: { invalid, isDirty } }) => (
        <TextField
          label="Email"
          variant="standard"
          error={isDirty && invalid}
          {...field}
          fullWidth
        />
      )}
    />
  );

  // return (
  //   <TextField
  //     name={props.name}
  //     label="Email"
  //     variant="standard"
  //     className={classes["text-input"]}
  //     error={!validEmail}
  //     onChange={onChangeHandler}
  //     value={props.value}
  //     fullWidth
  //   />
  // );
};

export default EmailTextfield;
