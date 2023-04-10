import type { NextApiRequest, NextApiResponse } from "next";

import { Zone } from "../../../../../models/Zones";
import {
  getFullTeams,
  saveTeams,
} from "../../../../../services/TeamCreationService";
import { getAllZones } from "../../../../../services/ZoneService";

interface Data {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const category: string = req.query["category"]?.toString() || "";
  if (req.method === "GET") {
    const zones: Zone[] = await getAllZones(category);

    res.status(200).json(zones);
  }
  if (req.method === "POST") {
  }
}
