import { Player } from "../../models/Player";
import { prismaClient } from "./PrismaClientServer";
import { getCategoryId } from "./CategoriaService";
import { jugador } from "@prisma/client";

const client = prismaClient;

export const getJugadorId = async (dni: string): Promise<number> => {
  let jugador: jugador = await client.jugador.findFirstOrThrow({
    where: {
      dni: dni,
    },
  });

  return jugador.id;
};

export const createJugador = async (
  player: Player,
  level: number
): Promise<number> => {
  const newPlayer: jugador = await client.jugador.create({
    data: {
      nombre: player.name,
      apellido: player.lastName,
      dni: player.dni,
      mail: player.email,
      telefono: player.phone,
      fecha_nacimiento: player.birthdate,
      sexo: player.gender,
      nivel_observado: level,
    },
  });

  return newPlayer.id;
};

export const updateJugador = async (id: number, player: Player) => {
  await client.jugador.update({
    where: {
      id: id,
    },
    data: {
      nombre: player.name,
      apellido: player.lastName,
      dni: player.dni,
      mail: player.email,
      telefono: player.phone,
      fecha_nacimiento: player.birthdate,
      sexo: player.gender,
    },
  });
};
