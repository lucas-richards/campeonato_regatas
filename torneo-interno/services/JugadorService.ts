import { Player } from "../models/Player";
import { prismaClient } from "./PrismaClientServer";
import { getCategoryId } from "./CategoriaService";

const client = prismaClient;

export const getJugadorId = async (
  dni: string
): Promise<number | undefined> => {
  let jugador = await client.jugador.findFirst({
    where: {
      dni: dni,
    },
  });

  return jugador?.id;
};

export const createJugador = async (
  player: Player,
  level: number
): Promise<number> => {
  const category = await getCategoryId(player.birthdate);

  await client.jugador.create({
    data: {
      nombre: player.name,
      apellido: player.lastName,
      dni: player.dni,
      mail: player.email,
      telefono: player.phone,
      fecha_nacimiento: player.birthdate,
      sexo: player.gender,
      categoria_id: category,
      nivel_observado: level,
    },
  });

  const id = await getJugadorId(player.dni);

  return id || 0;
};

export const updateJugador = async (id: number, player: Player) => {
  const category = await getCategoryId(player.birthdate);

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
      categoria_id: category,
    },
  });
};
