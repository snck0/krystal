import React from 'react';
import { motion, Variants } from 'framer-motion';

interface TileProps {
  letter?: string;
  status?: 'correct' | 'present' | 'absent' | 'active' | 'empty';
  delay?: number;
}

export const Tile: React.FC<TileProps> = ({ letter, status = 'empty', delay = 0 }) => {
  const variants: Variants = {
    empty: { 
      scale: 1, 
      rotateX: 0,
      backgroundColor: '#111111', 
      borderColor: '#333333',
      color: '#ffffff',
      boxShadow: 'none'
    },
    active: { 
      scale: [1, 1.1, 1], 
      rotateX: 0,
      borderColor: '#ffffff', 
      backgroundColor: '#2a2a2a',
      color: '#ffffff',
      transition: { duration: 0.15 }
    },
    correct: { 
      rotateX: [0, 90, 0],
      backgroundColor: ['#2a2a2a', '#2a2a2a', '#27ae60'],
      borderColor: ['#333333', '#333333', '#27ae60'],
      color: '#ffffff',
      boxShadow: ['none', 'none', '0 0 15px rgba(39, 174, 96, 0.4)'],
      transition: { 
        duration: 0.5,
        delay: delay * 0.15,
        times: [0, 0.5, 1]
      }
    },
    present: { 
      rotateX: [0, 90, 0],
      backgroundColor: ['#2a2a2a', '#2a2a2a', '#e6ac00'],
      borderColor: ['#333333', '#333333', '#e6ac00'],
      color: '#ffffff',
      boxShadow: ['none', 'none', '0 0 15px rgba(230, 172, 0, 0.4)'],
      transition: { 
        duration: 0.5,
        delay: delay * 0.15,
        times: [0, 0.5, 1]
      }
    },
    absent: { 
      rotateX: [0, 90, 0],
      backgroundColor: ['#2a2a2a', '#2a2a2a', '#3a3a3a'],
      color: '#aaaaaa',
      borderColor: '#444444',
      transition: { 
        duration: 0.5,
        delay: delay * 0.15,
        times: [0, 0.5, 1]
      }
    },
  };

  return (
    <motion.div
      animate={status}
      variants={variants}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.4rem',
        fontWeight: '800',
        textTransform: 'uppercase',
        borderRadius: '10px',
        border: '2px solid #333333',
        userSelect: 'none',
        width: 'min(3.2rem, 7vh)',
        height: 'min(3.2rem, 7vh)',
        flexShrink: 0,
      }}
    >
      {letter}
    </motion.div>
  );
};
