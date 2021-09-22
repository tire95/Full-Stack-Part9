import React from "react";
import { Container, Icon, Divider, Button } from "semantic-ui-react";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Patient, Entry, Gender } from "../types";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { addEntry, addOrUpdatePatient } from "../state";
import { HospitalEntryDetails, OccupationalEntryDetails, HealthCheckEntryDetails } from "../EntryDetails";
import { AddEntryModal } from "../Modals";
import { EntryFormValues } from "../Modals/AddEntryForm";


interface GenderIconProps {
  gender: Gender;
}

const GenderIcon = ({ gender }: GenderIconProps) => {
  switch (gender) {
    case "male":
      return <Icon name="mars" />;
    case "female":
      return <Icon name="venus" />;
    case "other":
      return <Icon name="genderless" />;
    default:
      return <Icon name="genderless" />;
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry, id));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(addOrUpdatePatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if (!patients[id].ssn) {
      void fetchPatient();
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Container textAlign="center">
        <h3>{patients[id].name}<GenderIcon gender={patients[id].gender} /></h3>
      </Container>
      <Container textAlign="left">
        <p>ssn: {patients[id].ssn} <br /> occupation: {patients[id].occupation}</p>
        <p>Entries:</p>
        {<div>
          {patients[id].entries?.map((entry: Entry) => (
            <div key={entry.id}>
              <EntryDetails entry={entry} />
              <Divider />
            </div>
          ))}
        </div>}
      </Container>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );

};

export default PatientPage;
