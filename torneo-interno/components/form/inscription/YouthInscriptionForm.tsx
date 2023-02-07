import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import OwnerForm from "./OwnerForm";
import { Button, Grid } from "@mui/material";
import YouthForm from "./YouthForm";
import { Category, Level, Position } from "../../../models/Player";
import { YouthInscription } from "../../../pages/api/inscription/youth";

interface YouthInscriptionFormProps {
  categories: Category[];
  positions: Position[];
  levels: Level[];
  gender: string;
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
  playerPosition: string;
  playerLevel: string;
  playerCaptain: string;
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
    playerPosition: "-1",
    playerLevel: "-1",
    playerCaptain: "-1",
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
    const incscription: YouthInscription = {
      emergencyPhone: data.playerPhone,
      position: +data.playerPosition,
      level: +data.playerLevel,
      captain: data.playerCaptain === "0" ? false : true,
      owner: {
        dni: data.ownerDni,
        name: data.ownerName,
        lastName: data.ownerSurname,
        email: data.ownerEmail,
        phone: data.ownerPhone,
      },
      player: {
        dni: data.playerDni,
        name: data.playerName,
        lastName: data.playerSurname,
        email: data.playerEmail,
        phone: data.playerPhone,
        birthdate: data.playerBirthdate,
        gender: props.gender,
      },
    };

    const createResponse = await fetch("/api/inscription/youth", {
      method: "POST",
      body: JSON.stringify(incscription),
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowGap={2}>
        <Grid item xs={12}>
          <OwnerForm control={control}></OwnerForm>
        </Grid>
        <Grid item xs={12}>
          <YouthForm
            control={control}
            startDate={startDate}
            endDate={endDate}
            positions={props.positions}
            levels={props.levels}
          ></YouthForm>
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
