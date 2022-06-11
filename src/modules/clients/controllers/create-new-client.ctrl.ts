import { Request, Response } from "express";
import { ClientEntity } from "../entities/client-entity";

export const createNewClient = async (req: Request, res: Response) => {
  const client = new ClientEntity();
  client.dni = req.body.dni;
  client.name = req.body.name;
  client.lastname = req.body.lastname;
  client.phone = req.body.phone;
  client.email = req.body.email;
  client.dateOfBirth = req.body.dateOfBirth;

  try {
    await client.save();
    res.status(201).json({ client });
  } catch(e) { 
    res.status(400).send(e);
  }
};