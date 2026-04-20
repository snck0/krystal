import React from 'react';
import { motion } from 'framer-motion';
import { Delete, CornerDownLeft } from 'lucide-react';

interface KeyboardProps {
  onKey: (key: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  guessedLetters: { [key: string]: 'correct' | 'present' | 'absent' | 'none' };
  hintLetter?: string;
}

const ROWS = [
  ['Ě', 'Š', 'Č', 'Ř', 'Ž', 'Ý', 'Á', 'Í', 'É'],
  ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'Ú'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ů'],
  ['Y', 'X', 'C', 'V', 'B', 'N', 'M']
];

export const Keyboard: React.FC<KeyboardProps> = ({ onKey, onDelete, onEnter, guessedLetters, hintLetter }) => {
  const getKeyStyle = (key: string) => {
    const status = guessedLetters[key.toLowerCase()];
    if (status === 'correct') return 'tile-correct';
    if (status === 'present') return 'tile-present';
    if (status === 'absent') return 'tile-absent';
    return '';
  };

  return (
    <div className="keyboard glass-panel">
      {ROWS.map((row, i) => (
        <div key={i} className="key-row">
          {i === 3 && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onEnter}
              className="key"
            >
              <CornerDownLeft size={18} />
            </motion.button>
          )}

          {row.map((key) => (
            <motion.button
              key={key}
              whileTap={{ scale: 0.95 }}
              onClick={() => onKey(key)}
              className={`key ${getKeyStyle(key)} ${hintLetter?.toUpperCase() === key ? 'key-hint' : ''}`}
            >
              {key}
            </motion.button>
          ))}

          {i === 3 && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onDelete}
              className="key"
            >
              <Delete size={18} />
            </motion.button>
          )}
        </div>
      ))}
    </div>
  );
};
