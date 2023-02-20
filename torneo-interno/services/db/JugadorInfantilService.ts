import { jugador_infantil, Prisma } from "@prisma/client";
import { Child, Player, YouthPlayer } from "../../models/Player";
import { prismaClient } from "./PrismaClientServer";
import { toYouthPlayer } from "../../transformers/Player";
import { getCategoryId } from "./CategoriaService";
import { getJugadorId } from "./JugadorService";

const client = prismaClient;

const jugadorInfantilIncludes =
  Prisma.validator<Prisma.jugador_infantilInclude>()({
    puesto: true,
    nivel: true,
    responsable: true,
    jugador: true,
    categoria: true,
    torneo: true,
  });

export const getAllRegisteredChildren = async (
  owner: number,
  tournament: number
): Promise<Child[]> => {
  const children: Prisma.jugador_infantilGetPayload<{
    include: {
      categoria: true;
      jugador: true;
    };
  }>[] = await client.jugador_infantil.findMany({
    where: {
      Torneo_id: tournament,
      responsable_id: owner,
    },
    include: {
      categoria: true,
      jugador: true,
    },
  });

  return children.map((el) => {
    return {
      dni: el.jugador.dni,
      name: el.jugador.nombre,
      lastName: el.jugador.apellido,
      category: el.categoria.descripcion,
      canPlay: el.habilitado === 1,
      fee: el.monto_inscripcion,
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

  const newYouthPlayer: jugador_infantil = await client.jugador_infantil.create(
    {
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
        categoria_id: category.id,
      },
    }
  );
};

export const getAllPlayers = async (
  categoryId: number,
  tournamentId: number
): Promise<YouthPlayer[]> => {
  const youth: Prisma.jugador_infantilGetPayload<{
    include: typeof jugadorInfantilIncludes;
  }>[] = await client.jugador_infantil.findMany({
    where: {
      categoria_id: categoryId,
      Torneo_id: tournamentId,
    },
    include: jugadorInfantilIncludes,
  });

  return youth.map((el) =>
    toYouthPlayer(
      el,
      el.puesto,
      el.nivel,
      el.torneo,
      el.responsable,
      el.jugador,
      el.categoria
    )
  );
};

export const getYouthPlayer = async (
  dni: string,
  tournamentId: number
): Promise<jugador_infantil> => {
  const player: number = await getJugadorId(dni);
  return await client.jugador_infantil.findFirstOrThrow({
    where: {
      Torneo_id: tournamentId,
      jugador_id: player,
    },
  });
};

export const setTeam = async (
  dni: string,
  tournament: number,
  team: number
) => {
  const player: jugador_infantil = await getYouthPlayer(dni, tournament);
  await client.jugador_infantil.update({
    data: {
      equipo_id: team,
    },
    where: {
      id: player.id,
    },
  });
};

export const getYouthPlayerById = async (id: number): Promise<YouthPlayer> => {
  const youth: Prisma.jugador_infantilGetPayload<{
    include: typeof jugadorInfantilIncludes;
  }> = await client.jugador_infantil.findFirstOrThrow({
    where: {
      id,
    },
    include: jugadorInfantilIncludes,
  });

  return toYouthPlayer(
    youth,
    youth.puesto,
    youth.nivel,
    youth.torneo,
    youth.responsable,
    youth.jugador,
    youth.categoria
  );
};

export const getYouthPlayers = async (
  players: number[]
): Promise<{ id: number; player: YouthPlayer }[]> => {
  const youth: Prisma.jugador_infantilGetPayload<{
    include: typeof jugadorInfantilIncludes;
  }>[] = await client.jugador_infantil.findMany({
    where: {
      id: {
        in: players,
      },
    },
    include: jugadorInfantilIncludes,
  });

  return youth.map((el) => {
    return {
      id: el.id,
      player: toYouthPlayer(
        el,
        el.puesto,
        el.nivel,
        el.torneo,
        el.responsable,
        el.jugador,
        el.categoria
      ),
    };
  });
};
