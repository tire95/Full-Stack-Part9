import patientData from '../../data/patients';
import { NewEntry, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const addEntry = (entry: NewEntry, patientId: string): Entry => {
  const id: string = uuid();
  const newEntry = {
    id: id,
    ...entry
  };
  patientData.find(patient => patient.id === patientId)?.entries.push(newEntry);
  return newEntry;
};

export default {
  addEntry
};