import { InscripcionInfantil } from "../pages/api/inscripcion/infantil";
import {
  createResponsable,
  getResponsableId,
  updateResponsable,
} from "./ResponsableService";
import { getLevelId } from "./NivelService";
import { getPositionId } from "./PuestoService";
import { createJugador, getJugadorId, updateJugador } from "./JugadorService";
import { Owner, Player } from "../models/Player";

const nullSafeOwnerId = async (owner: Owner): Promise<number> => {
  let ownerId = await getResponsableId(owner.dni);

  if (ownerId) {
    await updateResponsable(ownerId, owner);
  } else {
    ownerId = await createResponsable(owner);
  }

  return ownerId;
};

const nullSafePlayerId = async (
  player: Player,
  level: number
): Promise<number> => {
  let playerId: number | undefined = await getJugadorId(player.dni);

  if (playerId) {
    await updateJugador(playerId, player);
  } else {
    playerId = await createJugador(player, level);
  }

  return playerId;
};

export const inscripcionInfantil = async (inscripcion: InscripcionInfantil) => {
  console.log("adentro");
  const ownerId: number = await nullSafeOwnerId(inscripcion.owner);
  console.log(ownerId);
  const levelId: number = await getLevelId(inscripcion.level);
  console.log(levelId);
  const positionId: number = await getPositionId(inscripcion.position);
  console.log(positionId);
  const playerId: number = await nullSafePlayerId(
    inscripcion.player,
    inscripcion.level
  );
  console.log(ownerId);
};
