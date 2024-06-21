import { useState } from 'react';
import personsService from './services/persons';

const PersonForm = ({
  persons,
  setPersons,
  setNotificationMessage,
  setErrorMessage,
}) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const checkExistingName = (name) => {
    return persons.find((person) => person.name === name);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = checkExistingName(newName);

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (existingPerson) {
      updatePerson(existingPerson.id, newPerson);
    }

    creatNewPerson(newPerson);
  };

  const creatNewPerson = (newPerson) => {
    personsService
      .create(newPerson)
      .then((response) => {
        setPersons(persons.concat(response.data));
        setNotificationMessage(`Added ${newPerson.name}`);

        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      })
      .catch(() => {
        setErrorMessage(
          `Information from ${newPerson.name} has already been removed from server`,
        );

        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const updatePerson = (personId, newPerson) => {
    if (
      !window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`,
      )
    ) {
      return;
    }

    personsService
      .update(personId, newPerson)
      .then((response) => {
        setPersons(
          persons.map((person) =>
            person.id === personId ? response.data : person,
          ),
        );

        setNotificationMessage(`Updated ${newPerson.name}`);
      })
      .catch(() => {
        setErrorMessage(
          `Information from ${newPerson.name} has already been removed from server`,
        );

        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);

        removePerson(personId);
      });
  };

  const removePerson = (personId) => {
    setPersons(persons.filter((person) => person.id !== personId));
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
