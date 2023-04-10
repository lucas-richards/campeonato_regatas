import type { NextApiRequest, NextApiResponse } from "next";
import { RoundView } from "../../../../../models/Zones";

import { getAllZonesFromRound } from "../../../../../services/ZoneService";

interface Data {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const category: string = req.query["category"]?.toString() || "";
  const round: number = parseInt(req.query["round"]?.toString() || "");
  if (req.method === "GET") {
    const result: RoundView = await getAllZonesFromRound(category, round);

    res.status(200).json(result);
  }
  if (req.method === "POST") {
  }
}
