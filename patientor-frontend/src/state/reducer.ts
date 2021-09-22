import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

interface addEntryProps {
  entry: Entry,
  id: string
}

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_OR_UPDATE_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSES_LIST";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: addEntryProps;
  };

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi
  };
};

export const addOrUpdatePatient = (patient: Patient): Action => {
  return {
    type: "ADD_OR_UPDATE_PATIENT",
    payload: patient
  };
};

export const setDiagnosesList = (diagnosisListFromApi: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES_LIST",
    payload: diagnosisListFromApi
  };
};

export const addEntry = (entry: Entry, id: string): Action => {
  return {
    type: "ADD_ENTRY",
    payload: { entry, id }
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_OR_UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_ENTRY":
      const patient = state.patients[action.payload.id];
      patient.entries.push(action.payload.entry);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: patient
        }
      };
    default:
      return state;
  }
};
