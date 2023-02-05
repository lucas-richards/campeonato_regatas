import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import OwnerForm from "./OwnerForm";
import { Button, Grid, TextField } from "@mui/material";
import MaleYouthForm from "./MaleYouthForm";

const YouthInscriptionForm = () => {
  interface YouthInsriptionFormValues {
    ownerDni: string;
    ownerEmail: string;
    ownerName: string;
    ownerSurname: string;
    ownerPhone: string;
    playerDni: string;
    playerEmail: string;
    playerName: string;
    playerSurname: string;
    playerPhone: string;
    playerBirthdate: Date;
  }
  const defaultValues: YouthInsriptionFormValues = {
    ownerDni: "",
    ownerEmail: "",
    ownerName: "",
    ownerSurname: "",
    ownerPhone: "",
    playerDni: "",
    playerEmail: "",
    playerName: "",
    playerSurname: "",
    playerPhone: "",
    playerBirthdate: new Date(),
  };
  const {
    handleSubmit,
    watch,
    formState: { isValid },
    control,
  } = useForm({ mode: "onChange", defaultValues });

  const onSubmit = async (data: YouthInsriptionFormValues) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowGap={2}>
        <Grid item xs={12}>
          <OwnerForm control={control}></OwnerForm>
        </Grid>
        <Grid item xs={12}>
          <MaleYouthForm control={control}></MaleYouthForm>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" disabled={!isValid} variant={"contained"}>
            TEST
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default YouthInscriptionForm;
