import { Request, Response } from "express";
import { ClientEntity } from "../entities/client-entity";

export const createNewClient = async (req: Request, res: Response) => {
  const inputData = {
    dni: req.body.dni,
    name: req.body.name,
    lastname: req.body.lastname,
    phone: req.body.phone,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
  };

  try {
    const result = await ClientEntity.insert(inputData);
    const client = await ClientEntity.findOne({ 
      where: { id: result.raw.insertId }, 
      relations: { orders: true } 
    }); 
    res.status(201).json({ client });
  } catch(e) { 
    res.status(400).send(e);
  }
};