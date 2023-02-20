import type { NextApiRequest, NextApiResponse } from "next";

import { TeamCreationsView, TeamView } from "../../../../models/Team";
import {
  getFullTeams,
  saveTeams,
} from "../../../../services/TeamCreationService";

interface Data {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const category: string = req.query["category"]?.toString() || "";
  if (req.method === "GET") {
    const teams: TeamCreationsView = await getFullTeams(category);
    res.status(200).json(teams);
  }
  if (req.method === "POST") {
    const teams: TeamView[] = JSON.parse(req.body);
    await saveTeams(teams, category);
    res.status(201);
  }
}
