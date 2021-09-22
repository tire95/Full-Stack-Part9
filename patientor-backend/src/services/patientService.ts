import patientData from '../../data/patients';
import { NonSensitivePatientEntry, NewPatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): NonSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatient = (id: string): Patient => {
  return patientData.filter(patient => patient.id == id)[0];
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id: string = uuid();
  const newPatientEntry = {
    id: id,
    ...entry
  };
  patientData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getPatient,
  addPatient
};