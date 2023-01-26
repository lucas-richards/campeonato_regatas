import * as React from "react";
import { Owner, Player } from "../models/Player";
import { InscripcionInfantil } from "./api/inscripcion/infantil";

export interface IAppProps {}

export default function App(props: IAppProps) {
  const owner: Owner = {
    dni: "holsa",
    name: "chjau",
    lastName: "sadasd",
    email: "acsdxa",
    phone: "axzz",
  };

  const player: Player = {
    dni: "1231231",
    name: "asasd",
    lastName: "12312casdc",
    email: "a@a.com",
    phone: "12312312344",
    birthdate: new Date("05-05-2016"),
    gender: "M",
  };

  const application: InscripcionInfantil = {
    emergencyPhone: "1136718735",
    position: 1,
    level: 2,
    owner: owner,
    player: player,
  };
  fetch("/api/inscripcion/infantil", {
    method: "POST",
    body: JSON.stringify(application),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (
    <div>
      <h1>holas</h1>
    </div>
  );
}
