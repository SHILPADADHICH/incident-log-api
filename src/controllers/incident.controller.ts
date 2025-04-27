import { Request, Response } from 'express';
import Incident from '../models/incident.model';

export const getAllIncidents = async (req: Request, res: Response) => {
  const incidents = await Incident.find();
  res.status(200).json(incidents);
};

export const createIncident = async (req: Request, res: Response):Promise<any> => {
  const { title, description, severity } = req.body;

  if (!title || !description || !['Low', 'Medium', 'High'].includes(severity)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const incident = new Incident({ title, description, severity });
  await incident.save();
  res.status(201).json(incident);
};

export const getIncidentById = async (req: Request, res: Response):Promise<any> => {
  const incident = await Incident.findById(req.params.id);
  if (!incident) {
    return res.status(404).json({ error: 'Incident not found' });
  }
  res.status(200).json(incident);
};

export const deleteIncident = async (req: Request, res: Response):Promise<any> => {
  const incident = await Incident.findByIdAndDelete(req.params.id);
  if (!incident) {
    return res.status(404).json({ error: 'Incident not found' });
  }
  res.status(204).send();
};
