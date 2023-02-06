import React from "react";
import classes from "./inputcommons.module.scss";
import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface DatePickerProps {
  name: string;
  control: Control;
  label: string;
  startDate: Date;
  endDate: Date;
}

const DatePickerField = (props: DatePickerProps) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      rules={{
        required: true,
      }}
      render={({ field, fieldState: { invalid, isDirty } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            {...field}
            mask="__/__/____"
            disableFuture
            label={props.label}
            inputFormat="DD/MM/YYYY"
            minDate={props.startDate}
            maxDate={props.endDate}
            renderInput={(params) => (
              <TextField
                variant="standard"
                error={isDirty && invalid}
                {...params}
                fullWidth
              />
            )}
          ></DatePicker>
        </LocalizationProvider>
      )}
    />
  );
};

export default DatePickerField;
