import React from "react";
import { Container, Icon } from "semantic-ui-react";
import { useStateValue } from "../state";
import { HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../types";
import HealthRatingBar from "../components/HealthRatingBar";

export const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Container textAlign="left">
      <div>
        <p>{entry.date} <Icon name="hospital" /></p>
        <p><i>{entry.description}</i></p>
        <p>Specialist: {entry.specialist}</p>
        <ul>{entry.diagnosisCodes?.map((diagnosis: string) => (
          <li key={diagnosis}>{diagnosis} {diagnoses[diagnosis].name}</li>
        ))}</ul>
        <p>Discharge: <br /> {entry.discharge.date} <i>{entry.discharge.criteria}</i></p>
      </div>
    </Container>
  );
};

export const OccupationalEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  const SickLeave = () => {
    if (entry.sickLeave) {
      return (<p>Sickleave: from {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate}</p>);
    } else {
      return <p></p>;
    }
  };

  return (
    <Container textAlign="left">
      <div>
        <p>{entry.date} <Icon name="user md" /></p>
        <p><i>{entry.description}</i></p>
        <p>Employer: {entry.employerName}</p>
        <p>Specialist: {entry.specialist}</p>
        <ul>{entry.diagnosisCodes?.map((diagnosis: string) => (
          <li key={diagnosis}>{diagnosis} {diagnoses[diagnosis].name}</li>
        ))}</ul>
        <SickLeave />
      </div>
    </Container>
  );
};

export const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Container textAlign="left">
      <div>
        <p>{entry.date} <Icon name="stethoscope" /></p>
        <p><i>{entry.description}</i></p>
        <p>Specialist: {entry.specialist}</p>
        <ul>{entry.diagnosisCodes?.map((diagnosis: string) => (
          <li key={diagnosis}>{diagnosis} {diagnoses[diagnosis].name}</li>
        ))}</ul>
        <HealthRatingBar showText={false} rating={entry.healthCheckRating} />
      </div>
    </Container>
  );
};