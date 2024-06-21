import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import axios from 'axios';

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const CountryList = ({ countries, setCountry }) => {
  useEffect(() => {
    if (countries?.length === 1) {
      setCountry(countries[0]);
    }
  }, [countries, setCountry]);

  if (countries?.length > 10) {
    return 'Too many matches, specify another filter';
  } else if (countries?.length > 1) {
    return countries.map((country) => (
      <CountryLine
        key={country?.cca3}
        country={country}
        setCountry={setCountry}
      />
    ));
  }
};

const CountryLine = ({ country, setCountry }) => {
  const handleCountryClick = () => {
    setCountry(country);
  };

  return (
    <p key={country?.cca3}>
      {country?.name?.common} <button onClick={handleCountryClick}>show</button>
    </p>
  );
};

const CountryDetails = ({ country }) => {
  return (
    <>
      <h1>{country?.name?.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <ul>
        {Object.entries(country.languages).map(([key, language]) => (
          <li key={key}>{language}</li>
        ))}
      </ul>
      <img src={country?.flags?.png} />

      <CountryWeather country={country} />
    </>
  );
};

const CountryWeather = ({ country }) => {
  const [countryWeather, setCountryWeather] = useState(null);

  const getWeather = ({ lat, lon }) => {
    return axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`,
      )
      .then((response) => response.data);
  };

  useEffect(() => {
    const [lat, lon] = country.latlng;

    getWeather({ lat, lon }).then((weather) => setCountryWeather(weather));
  }, [country]);

  return (
    <>
      <h2>Weather in Helsinki</h2>
      <p>temperature {countryWeather?.main?.temp} Celsius</p>
      {countryWeather?.weather?.map((row) => (
        <img
          key={row?.id}
          src={'https://openweathermap.org/img/wn/' + row?.icon + '.png'}
        />
      ))}
      <p>wind {countryWeather?.wind?.speed} m/s</p>
    </>
  );
};

const App = () => {
  const [country, setCountry] = useState(null);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => setCountries(response.data));
  }, []);

  const handleCountryChange = (event) => {
    setFilteredCountries(
      countries.filter((country) =>
        country?.name?.common
          ?.toLowerCase()
          ?.includes(event.target.value.toLowerCase()),
      ),
    );
  };

  return (
    <>
      <p>
        find countries <input type='text' onChange={handleCountryChange} />
      </p>
      <CountryList countries={filteredCountries} setCountry={setCountry} />
      {country && <CountryDetails country={country} />}
    </>
  );
};

export default App;
