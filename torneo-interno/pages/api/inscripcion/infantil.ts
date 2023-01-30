import type { NextApiRequest, NextApiResponse } from "next";
import { Owner, Player } from "../../../models/Player";
import { youthInscription } from "../../../services/InscriptionService";

interface Data {}

export interface YouthInscription {
  emergencyPhone: string;
  position: number;
  level: number;
  owner: Owner;
  player: Player;
  captain: boolean;
}

export interface SeniorInscription {
  owner: Owner;
  players: Player[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const formulario: YouthInscription = req.body;

    const inscripcion = await youthInscription(formulario);

    res.status(200).json({ name: "John Doe" });
  }
}
