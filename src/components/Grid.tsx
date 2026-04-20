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
  const getRowStatuses = (guess: string) => {
    if (!guess) return [];
    const statuses: ('correct' | 'present' | 'absent' | 'empty')[] = Array(wordLength).fill('absent');
    const solutionChars = solution.split('');
    
    // First pass: exact matches
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === solution[i]) {
        statuses[i] = 'correct';
        solutionChars[i] = null as any; 
      }
    }
    
    // Second pass: present matches
    for (let i = 0; i < guess.length; i++) {
      if (statuses[i] !== 'correct') {
        const idx = solutionChars.indexOf(guess[i]);
        if (idx !== -1) {
          statuses[i] = 'present';
          solutionChars[idx] = null as any; 
        }
      }
    }
    return statuses;
  };

  const rows = Array.from({ length: 8 });
  const emptyRows = 8 - guesses.length - (isGameOver ? 0 : 1);

  return (
    <div className="grid-container" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {/* Finished guesses */}
      {guesses.map((guess, i) => {
        const rowStatuses = getRowStatuses(guess);
        return (
          <div key={i} className="key-row" style={{ display: 'flex', gap: '8px' }}>
            {guess.split('').map((letter, j) => (
              <Tile key={j} letter={letter} status={rowStatuses[j]} delay={j} />
            ))}
          </div>
        );
      })}

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
