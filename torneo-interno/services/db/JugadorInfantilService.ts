import { jugador_infantil } from "@prisma/client";
import { Player, YouthPlayer } from "../../models/Player";
import { prismaClient } from "./PrismaClientServer";

const client = prismaClient;

export const getAllRegisteredChildren = async (
  owner: number,
  tournament: number
): Promise<YouthPlayer[]> => {
  const children: jugador_infantil[] = await client.jugador_infantil.findMany({
    where: {
      Torneo_id: tournament,
      responsable_id: owner,
    },
  });

  return children.map((el) => {
    return {
      emergencyPhone: el.telefono_emergencia || "",
      canPlay: el.habilitado === 1,
    };
  });
};

export const createYouthPlayer = async (
  player: Player,
  captain: boolean,
  ownerId: number,
  levelId: number,
  positionId: number,
  playerId: number,
  tournamentId: number,
  thirdSon: boolean,
  isAssociated: boolean,
  fee: number
): Promise<void> => {
  await client.jugador_infantil.create({
    data: {
      telefono_emergencia: player.phone,
      socio: isAssociated ? 1 : 0,
      puesto_id: positionId,
      nivel_id: levelId,
      capitan: captain ? 1 : 0,
      Torneo_id: tournamentId,
      responsable_id: ownerId,
      jugador_id: playerId,
      tercer_hijo: thirdSon ? 1 : 0,
      monto_inscripcion: fee,
    },
  });
};
