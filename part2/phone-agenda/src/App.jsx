import { useState, useEffect } from 'react';
import personService from './services/persons';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Filter from './Filter';
import Notification from './Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setNewFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const hook = () => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  };

  useEffect(hook, []);

  const handelFilterChange = (event) => {
    setNewFilter(event.target.valuetoLowerCase());
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMessage} errorMessage={errorMessage}/>

      <Filter filter={filter} handelFilterChange={handelFilterChange} />

      <h2>add a new</h2>

      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setNotificationMessage={setNotificationMessage}
        setErrorMessage={setErrorMessage}
      />

      <h2>Numbers</h2>

      <Persons persons={persons} filter={filter} setPersons={setPersons} />
    </div>
  );
};

export default App;
