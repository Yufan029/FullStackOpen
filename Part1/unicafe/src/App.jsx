import { useState } from 'react';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header />
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Header = () => <h1>give feedback</h1>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positiveNum = good / all * 100
  const positive = positiveNum+'%'

  return (
    <div>
      <h2>statistics</h2>
      {all > 0 ? (
        <table>
          <tbody>
            <tr>
              <td>good</td>
              <td>{good}</td>
            </tr>
            <tr>
              <td>neutral</td>
              <td>{neutral}</td>
            </tr>
            <tr>
              <td>bad</td>
              <td>{bad}</td>
            </tr>
            <tr>
              <td>all</td>
              <td>{all}</td>
            </tr>
            <tr>
              <td>average</td>
              <td>{average}</td>
            </tr>
            <tr>
              <td>positive</td>
              <td>{positive}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  )
}

const StatisticLine = ({ text, value }) => <div>{text} {value}</div>
export default App
