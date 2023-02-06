import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import OwnerForm from "./OwnerForm";
import { Button, Grid, TextField } from "@mui/material";
import MaleYouthForm from "./MaleYouthForm";
import { Category } from "../../../models/Player";

interface YouthInscriptionFormProps {
  categories: Category[];
}

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
  playerCategory: string;
}

const YouthInscriptionForm = (props: YouthInscriptionFormProps) => {
  const categories = props.categories.map((el) => {
    return {
      ...el,
      startDate: new Date(el.startDate),
      endDate: new Date(el.endDate),
    };
  });

  const startDate = categories
    .map((el) => el.startDate)
    .reduce((prev, current) => (prev <= current ? prev : current));
  startDate.setDate(startDate.getDate() + 1);

  const endDate = categories
    .map((el) => el.endDate)
    .reduce((prev, current) => (prev >= current ? prev : current));

  console.log(startDate, endDate);

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
    playerBirthdate: endDate,
    playerCategory: "",
  };

  const {
    handleSubmit,
    watch,
    formState: { isValid },
    control,
    setValue,
  } = useForm({ mode: "onBlur", defaultValues });
  const birthdateWatch = watch("playerBirthdate");

  useEffect(() => {
    let category = categories.find(
      (el) => el.startDate < birthdateWatch && el.endDate >= birthdateWatch
    );

    if (category) setValue("playerCategory", category.description);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [birthdateWatch]);

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
          <MaleYouthForm
            control={control}
            startDate={startDate}
            endDate={endDate}
          ></MaleYouthForm>
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
