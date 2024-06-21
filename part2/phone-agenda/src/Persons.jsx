import personService from './services/persons';

const Person = ({ persons, person, setPersons }) => {
  const deletePerson = async () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      await personService.remove(person.id);

      setPersons(
        persons.filter((currentPerson) => person.id !== currentPerson.id),
      );
    }
  };

  return (
    <li>
      {person.name} {person.number}
      <button onClick={deletePerson}> delete </button>
    </li>
  );
};

const Persons = ({ persons, filter, setPersons }) => {
  return (
    <ul>
      {persons
        .filter((person) =>
          filter ? person.name.toLowerCase().includes(filter) : true,
        )
        .map((person) => (
          <Person
            key={person.id}
            persons={persons}
            person={person}
            setPersons={setPersons}></Person>
        ))}
    </ul>
  );
};

export default Persons;
