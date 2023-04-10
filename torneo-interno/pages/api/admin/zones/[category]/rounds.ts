import { NextApiRequest, NextApiResponse } from "next";
import { getRounds } from "../../../../../services/db/ZonaService";

interface Data {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const category: string = req.query["category"]?.toString() || "";
  if (req.method === "GET") {
    const rounds: number[] = await getRounds(category);

    res.status(200).json(rounds);
  }
}
