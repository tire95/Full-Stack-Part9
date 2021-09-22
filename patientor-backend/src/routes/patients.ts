import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewHealthEntry, toNewHospitalEntry, toNewOccupationalEntry } from '../utils';
import entryService from '../services/entryService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    switch (req.body.type) {
      case "Hospital":
        const newHospitalEntry = toNewHospitalEntry(req.body);
        const addedHospitalEntry = entryService.addEntry(newHospitalEntry, req.params.id);
        res.json(addedHospitalEntry);
        return;
      case "OccupationalHealthcare":
        const newOccupationalEntry = toNewOccupationalEntry(req.body);
        const addedOccupationalEntry = entryService.addEntry(newOccupationalEntry, req.params.id);
        res.json(addedOccupationalEntry);
        return;
      case "HealthCheck":
        const newHealthEntry = toNewHealthEntry(req.body);
        const addedHealthEntry = entryService.addEntry(newHealthEntry, req.params.id);
        res.json(addedHealthEntry);
        return;
      default:
        return;
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;