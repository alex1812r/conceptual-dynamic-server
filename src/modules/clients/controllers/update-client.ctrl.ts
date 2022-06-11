import { Request, Response } from "express";
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
  
  const newData = {
    name: req.body.name,
    lastname: req.body.lastname,
    dni: req.body.dni,
    phone: req.body.phone,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    status: req.body.status,
  };

  await ClientEntity.update({ id: clientId }, newData);

  const updatedClient = await ClientEntity.findOneBy({ id: clientId }); 

  res.status(200).json({ client: updatedClient });
}