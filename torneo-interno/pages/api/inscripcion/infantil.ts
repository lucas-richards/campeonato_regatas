import type { NextApiRequest, NextApiResponse } from "next";
import { Owner, Player } from "../../../models/Player";
import { inscripcionInfantil } from "../../../services/InscripcionService";

interface Data {}

export interface InscripcionInfantil {
  emergencyPhone: string;
  position: number;
  level: number;
  owner: Owner;
  player: Player;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    console.log("hola");
    const formulario: InscripcionInfantil = req.body;

    const inscripcion = await inscripcionInfantil(formulario);

    res.status(200).json({ name: "John Doe" });
  }
}
