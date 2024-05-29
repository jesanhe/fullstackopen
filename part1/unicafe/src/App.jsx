import { useState } from 'react';

const Button = ({ text, setter }) => {
  return <button onClick={setter}>{text}</button>;
};

const GiveFeedback = ({ goodSetter, NeutralSetter, badSetter }) => {
  return (
    <div>
      <h1>give feedback</h1>

      <div>
        <Button text='good' setter={goodSetter} />
        <Button text='neutral' setter={NeutralSetter} />
        <Button text='bad' setter={badSetter} />
      </div>
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good * 100) / all;

  if (all > 0) {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={all} />
            <StatisticLine text='average' value={average} />
            <StatisticLine text='positive' value={positive} />
          </tbody>
        </table>
      </div>
    );
  }

  return <p>No feedback given</p>;
};

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <GiveFeedback
        goodSetter={() => setGood(good + 1)}
        NeutralSetter={() => setNeutral(neutral + 1)}
        badSetter={() => setBad(bad + 1)}
      />

      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
