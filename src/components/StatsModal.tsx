'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Award, Flame, TrendingUp } from 'lucide-react';

interface StatsModalProps {
  stats: any;
  loading?: boolean;
  onClose: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({ stats, loading, onClose }) => {
  const winCount = stats?.games?.filter((g: any) => g.isWin).length || 0;
  const totalGames = stats?.games?.length || 0;
  const winPct = totalGames > 0 ? Math.round((winCount / totalGames) * 100) : 0;

  const distribution = [0, 0, 0, 0, 0, 0, 0, 0];
  stats?.games?.forEach((g: any) => {
    if (g.isWin && g.attempts >= 1 && g.attempts <= 8) {
      distribution[g.attempts - 1]++;
    }
  });
  const maxDist = Math.max(...distribution, 1);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
        padding: '20px',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '420px', padding: '30px',
          background: '#ffffff', borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
        >
          <X color="#333" size={22} />
        </button>

        <h2 style={{ marginBottom: '24px', textAlign: 'center', color: '#1a1a1a', fontSize: '1.3rem', fontWeight: '800' }}>
          Moje statistiky
        </h2>

        {loading ? (
          <div style={{ textAlign: 'center', color: '#999', padding: '30px 0', fontSize: '0.9rem' }}>
            Načítám...
          </div>
        ) : !stats ? (
          <div style={{ textAlign: 'center', color: '#999', padding: '30px 0', fontSize: '0.9rem' }}>
            Zatím žádné statistiky. Dohraj první hru!
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '28px' }}>
              <StatBox label="Hry" value={totalGames} icon={<TrendingUp size={14} color="#666" />} />
              <StatBox label="Výhry %" value={`${winPct}%`} icon={<Award size={14} color="#f39c12" />} />
              <StatBox label="Série" value={stats.currentStreak} icon={<Flame size={14} color="#e67e22" />} />
              <StatBox label="Max" value={stats.maxStreak} icon={<Flame size={14} color="#e74c3c" />} />
            </div>

            <h3 style={{ marginBottom: '12px', fontSize: '0.85rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Distribuce výher
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              {distribution.map((count, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '14px', fontSize: '0.8rem', color: '#666', textAlign: 'right' }}>{i + 1}</div>
                  <div style={{ flex: 1, height: '22px', background: '#f0f0f0', borderRadius: '6px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / maxDist) * 100}%` }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      style={{
                        height: '100%',
                        background: count > 0 ? '#27ae60' : '#e0e0e0',
                        borderRadius: '6px',
                        minWidth: count > 0 ? '22px' : '0',
                      }}
                    />
                  </div>
                  <div style={{ width: '20px', textAlign: 'right', fontSize: '0.8rem', color: '#666', fontWeight: '600' }}>{count}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

const StatBox = ({ label, value, icon }: { label: string; value: any; icon: any }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
    background: '#f8f8f8', borderRadius: '12px', padding: '12px 8px',
  }}>
    {icon}
    <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#1a1a1a', lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: '0.65rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
  </div>
);
