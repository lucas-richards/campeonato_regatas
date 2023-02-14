import { jugador_infantil } from "@prisma/client";
import { Player, YouthPlayer } from "../../models/Player";
import { prismaClient } from "./PrismaClientServer";
import { toYouthPlayer } from "../../transformers/Player";
import {
  getCategoryIdFromDescription,
  getCategoryId,
} from "./CategoriaService";

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
      emergencyPhone: el.telefono_emergencia,
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
  const category = await getCategoryId(player.birthdate, player.gender);

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
      categoria_id: category,
    },
  });
};

export const getAllPlayers: YouthPlayer[] = async (category: string) => {
  const categoryId = await getCategoryIdFromDescription(category);

  const youth: jugador_infantil[] = await client.jugador_infantil.findMany({
    where: {
      categoria_id: categoryId,
    },
    include: {
      puesto: true,
      nivel: true,
      responsable: true,
      jugador: true,
      categoria: true,
    },
  });

  console.log(youth);

  return youth.map((el) => toYouthPlayer(el));
};
