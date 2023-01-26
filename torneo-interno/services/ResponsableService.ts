import { Owner } from "../models/Player";
import { ID, prismaClient } from "./PrismaClientServer";

const client = prismaClient;

export const getResponsableId = async (
  dni: string
): Promise<number | undefined> => {
  let responsable = await client.responsable.findFirst({
    where: {
      dni,
    },
  });

  return responsable?.id;
};

export const createResponsable = async (owner: Owner): Promise<number> => {
  await client.responsable.create({
    data: {
      nombre: owner.name,
      apellido: owner.lastName,
      mail_contacto: owner.email,
      telefono: owner.phone,
      dni: owner.dni,
    },
  });

  const id = await getResponsableId(owner.dni);

  return id || 0;
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
