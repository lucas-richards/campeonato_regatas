import { responsable } from "@prisma/client";
import { Owner } from "../../models/Player";
import { ID, prismaClient } from "./PrismaClientServer";

const client = prismaClient;

export const getResponsableId = async (dni: string): Promise<number> => {
  let responsable = await client.responsable.findFirstOrThrow({
    where: {
      dni,
    },
  });

  return responsable.id;
};

export const createResponsable = async (owner: Owner): Promise<number> => {
  const newOwner: responsable = await client.responsable.create({
    data: {
      nombre: owner.name,
      apellido: owner.lastName,
      mail_contacto: owner.email,
      telefono: owner.phone,
      dni: owner.dni,
    },
  });
  return newOwner.id;
};

export const updateResponsable = async (id: number, owner: Owner) => {
  await client.responsable.update({
    where: {
      id: id,
    },
    data: {
      nombre: owner.name,
      apellido: owner.lastName,
      mail_contacto: owner.email,
      telefono: owner.phone,
      dni: owner.dni,
    },
  });
};
