import {
  Category,
  Level,
  Owner,
  Position,
  Tournament,
  YouthPlayer,
  Player,
} from "../models/Player";
import {
  categoria,
  jugador_infantil,
  nivel,
  puesto,
  responsable,
  torneo,
  jugador,
} from "@prisma/client";

export const toCategory = (category: categoria): Category => {
  return {
    id: category.id,
    description: category.descripcion,
    startDate: category["ano_inicio"],
    endDate: category["ano_fin"],
  };
};

export const toPosition = (position: puesto): Position => {
  return {
    description: position.descripcion,
    value: position.valor,
  };
};

export const toLevel = (position: nivel): Level => {
  return {
    description: position.descripcion,
    value: position.valor,
  };
};

export const toTournament = (tournament: torneo): Tournament => {
  return {
    id: tournament.id,
    year: tournament.ano_torneo,
  };
};

export const toOwner = (owner: responsable): Owner => {
  return {
    dni: owner.dni,
    name: owner.nombre,
    lastName: owner.apellido,
    email: owner.mail_contacto,
    phone: owner.telefono,
  };
};

export const toPlayer = (player: jugador, level?: nivel): Player => {
  const transformed: Player = {
    dni: player.dni,
    name: player.nombre,
    lastName: player.apellido,
    email: player.mail,
    phone: player.telefono,
    birthdate: player.fecha_nacimiento,
    gender: player.sexo,
  };

  if (level) transformed.realLevel = toLevel(level);

  return transformed;
};

export const toYouthPlayer = (
  youthPlayer: jugador_infantil,
  position?: puesto,
  level?: nivel,
  tournament?: torneo,
  owner?: responsable,
  player?: jugador,
  category?: categoria
): YouthPlayer => {
  const youth: YouthPlayer = {
    emergencyPhone: youthPlayer["telefono_emergencia"],
    member: youthPlayer.socio === 1,
    canPlay: youthPlayer.habilitado === 1,
    thirdChild: youthPlayer.tercer_hijo === 1,
    captain: youthPlayer.capitan === 1,
    teamId: youthPlayer.equipo_id || undefined,
  };

  if (position) youth.position = toPosition(position);
  if (level) youth.level = toLevel(level);
  if (tournament) youth.tournament = toTournament(tournament);
  if (owner) youth.owner = toOwner(owner);
  if (player) youth.player = toPlayer(player);
  if (category) youth.category = toCategory(category);

  return youth;
};
