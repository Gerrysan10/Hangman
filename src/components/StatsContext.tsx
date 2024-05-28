import React, { createContext, useState } from 'react';

interface StatsContextData {
  winCount: number;
  loseCount: number;
  incrementWinCount: () => void;
  incrementLoseCount: () => void;
}

export const StatsContext = createContext<StatsContextData>({
  winCount: 0,
  loseCount: 0,
  incrementWinCount: () => {},
  incrementLoseCount: () => {},
});

export const StatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [winCount, setWinCount] = useState(0);
  const [loseCount, setLoseCount] = useState(0);

  const incrementWinCount = () => setWinCount((prevCount) => prevCount + 1);
  const incrementLoseCount = () => setLoseCount((prevCount) => prevCount + 1);

  return (
    <StatsContext.Provider value={{ winCount, loseCount, incrementWinCount, incrementLoseCount }}>
      {children}
    </StatsContext.Provider>
  );
};