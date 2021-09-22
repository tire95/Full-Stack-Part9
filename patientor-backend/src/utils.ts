import { NewPatientEntry, Gender, NewEntry, NewHospitalEntry, NewHealthEntry, NewOccupationalEntry, HealthCheckRating } from './types';

type PatientFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing name');
  }

  return text;
};

const parseSsn = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing ssn');
  }

  return text;
};

const parseOccupation = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing occupation');
  }

  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: PatientFields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: []
  };

  return newEntry;
};

const parseDescription = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing description');
  }

  return text;
};

const parseSpecialist = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing specialist');
  }

  return text;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isArray = (param: any): param is unknown[] => {
  return (Object.prototype.toString.call(param) === "[object Array]");
};

const parseDiagnosisCodes = (codes: unknown): string[] => {
  if (!codes) {
    return [];
  }
  if (isArray(codes)) {
    const arrayCodes: unknown[] = codes;
    const stringCodes: string[] = [];
    arrayCodes.forEach(code => {
      if (!isString(code)) {
        throw new Error('Incorrect or missing code');
      }
      stringCodes.push(code);
    });
    return stringCodes;
  }

  throw new Error('Incorrect or missing code');
};

type Discharge = {
  date: string,
  criteria: string
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param: any): param is Discharge => {
  return "date" in param && "criteria" in param;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge');
  }
  return discharge;
};

type HospitalEntryFields = { description: unknown, date: unknown, specialist: unknown, diagnosisCodes?: unknown, discharge: unknown };

export const toNewHospitalEntry = ({ description, date, specialist, diagnosisCodes, discharge }: HospitalEntryFields): NewEntry => {
  const newEntry: NewHospitalEntry = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    discharge: parseDischarge(discharge),
    type: "Hospital"
  };
  return newEntry;
};

type HealthEntryFields = { description: unknown, date: unknown, specialist: unknown, diagnosisCodes?: unknown, healthCheckRating: unknown };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isRating(rating)) {
    throw new Error('Incorrect or missing health check rating');
  }
  return rating;
};

export const toNewHealthEntry = ({ description, date, specialist, diagnosisCodes, healthCheckRating }: HealthEntryFields): NewEntry => {
  const newEntry: NewHealthEntry = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    healthCheckRating: parseHealthCheckRating(healthCheckRating),
    type: "HealthCheck"
  };
  return newEntry;
};

type OccupationalEntryFields = { description: unknown, date: unknown, specialist: unknown, diagnosisCodes?: unknown, employerName: unknown, sickLeave?: unknown };

const parseEmployer = (employer: unknown): string => {
  if (!employer || !isString(employer)) {
    throw new Error('Incorrect or missing employer name');
  }
  return employer;
};

type SickLeave = {
  startDate: string,
  endDate: string
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (param: any): param is SickLeave => {
  if (!param) {
    return true;
  }
  return "startDate" in param && "endDate" in param;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sick leave');
  }
  return sickLeave;
};

export const toNewOccupationalEntry = ({ description, date, specialist, diagnosisCodes, employerName, sickLeave }: OccupationalEntryFields): NewEntry => {
  const newEntry: NewOccupationalEntry = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    employerName: parseEmployer(employerName),
    sickLeave: parseSickLeave(sickLeave),
    type: "OccupationalHealthcare"
  };
  return newEntry;
};