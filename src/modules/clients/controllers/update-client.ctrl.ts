import { Request, Response } from "express";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { ClientEntity } from "../entities/client-entity";

type RequestParams = {
  id: string;
}
type RequestBody = Partial<{
  name: string;
  lastname: string;
  dni: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  status: string;
}>
export const updateClient = async (req: Request<RequestParams, {}, RequestBody>, res: Response) => {
  const clientId = Number(req.params.id);

  const updateData: QueryDeepPartialEntity<ClientEntity> = {
    name: req.body.name,
    lastname: req.body.lastname,
    dni: req.body.dni,
    phone: req.body.phone,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    status: req.body.status,
  };

  const updatedClient = await ClientEntity
    .update({ id: clientId }, updateData)
    .then(() => ClientEntity.findOneBy({ id: clientId }));


  res.status(200).json({ client: updatedClient });
}