import type { NextApiRequest, NextApiResponse } from "next";
import { Owner, Player } from "../../../../models/Player";
import { youthInscription } from "../../../../services/InscriptionService";
import { TeamCreationsView } from "../../../../models/Team";
import { getFullTeams } from "../../../../services/TeamCreationService";

interface Data {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const category: string = req.query["category"]?.toString() || "";

    const teams: TeamCreationsView = await getFullTeams(category);
    res.status(200).json(teams);
  }
}
