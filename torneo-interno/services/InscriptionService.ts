import { YouthInscription } from "../pages/api/inscripcion/infantil";
import {
  createResponsable,
  getResponsableId,
  updateResponsable,
} from "./db/ResponsableService";
import { getLevelId } from "./db/NivelService";
import { getPositionId } from "./db/PuestoService";
import {
  createJugador,
  getJugadorId,
  updateJugador,
} from "./db/JugadorService";
import { Owner, Player, Tournament, YouthPlayer } from "../models/Player";
import { getActiveTournament } from "./db/TorneoService";
import {
  createYouthPlayer,
  getAllRegisteredChildren,
} from "./db/JugadorInfantilService";
import { isAssociated } from "./db/SocioService";
import { getFee } from "./db/TarifaService";

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

export const youthInscription = async (inscripcion: YouthInscription) => {
  const ownerId: number = await nullSafeOwnerId(inscripcion.owner);

  const levelId: number = await getLevelId(inscripcion.level);

  const positionId: number = await getPositionId(inscripcion.position);
  const playerId: number = await nullSafePlayerId(
    inscripcion.player,
    inscripcion.level
  );

  const tournament: Tournament = await getActiveTournament();

  const otherPlayers: YouthPlayer[] = await getAllRegisteredChildren(
    ownerId,
    tournament.id
  );

  const associated: boolean = await isAssociated(inscripcion.player.dni);
  const fee: number = await getFee(associated);

  await createYouthPlayer(
    inscripcion.player,
    inscripcion.captain,
    ownerId,
    levelId,
    positionId,
    playerId,
    tournament.id,
    otherPlayers.length >= 3,
    associated,
    fee
  );

  return otherPlayers;
};
