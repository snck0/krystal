import React from 'react';
import { Tile } from './Tile';

interface GridProps {
  guesses: string[];
  currentGuess: string;
  solution: string;
  isGameOver: boolean;
  wordLength: number;
}

export const Grid: React.FC<GridProps> = ({ guesses, currentGuess, solution, isGameOver, wordLength }) => {
  const getStatus = (index: number, rowIndex: number) => {
    const guess = guesses[rowIndex];
    if (!guess) return 'empty';
    
    const letter = guess[index];
    if (letter === solution[index]) return 'correct';
    if (solution.includes(letter)) return 'present';
    return 'absent';
  };

  const rows = Array.from({ length: 8 });
  const emptyRows = 8 - guesses.length - (isGameOver ? 0 : 1);

  return (
    <div className="grid-container" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {/* Finished guesses */}
      {guesses.map((guess, i) => (
        <div key={i} className="key-row" style={{ display: 'flex', gap: '8px' }}>
          {guess.split('').map((letter, j) => (
            <Tile key={j} letter={letter} status={getStatus(j, i)} delay={j} />
          ))}
        </div>
      ))}

      {/* Current guess */}
      {!isGameOver && (
        <div className="key-row" style={{ display: 'flex', gap: '8px' }}>
          {Array.from({ length: wordLength }).map((_, i) => {
            const letter = currentGuess[i];
            return <Tile key={i} letter={letter} status={letter ? 'active' : 'empty'} />;
          })}
        </div>
      )}

      {/* Empty rows */}
      {Array.from({ length: Math.max(0, emptyRows) }).map((_, i) => (
        <div key={i} className="key-row" style={{ display: 'flex', gap: '8px' }}>
          {Array.from({ length: wordLength }).map((_, j) => (
            <Tile key={j} />
          ))}
        </div>
      ))}
    </div>
  );
};
