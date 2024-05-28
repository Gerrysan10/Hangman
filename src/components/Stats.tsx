import React, { useContext } from 'react';
import { StatsContext } from './StatsContext';

const Stats: React.FC = () => {
  const { winCount, loseCount } = useContext(StatsContext);

  return (
    <div className="stats-container">
      <h2>Game Statistics</h2>
      <table>
        <thead>
          <tr>
            <th>Outcome</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Wins</td>
            <td>{winCount}</td>
          </tr>
          <tr>
            <td>Losses</td>
            <td>{loseCount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Stats;