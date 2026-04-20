'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Grid } from './Grid';
import { Keyboard } from './Keyboard';
import { getDailyWord, getRandomWord, WordEntry } from '@/data/words';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart2, RefreshCw, Share2, Lightbulb, LogOut, Timer } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { StatsModal } from './StatsModal';

export interface LocalStats {
  games: {
    word: string;
    attempts: number;
    points: number;
    isWin: boolean;
    date: string;
  }[];
  currentStreak: number;
  maxStreak: number;
}

// ── Web Audio Sounds ──────────────────────────────────────────────
const createAudioContext = () => {
  if (typeof window === 'undefined') return null;
  return new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
};

const playSound = (type: 'key' | 'win' | 'lose' | 'hint') => {
  try {
    const ctx = createAudioContext();
    if (!ctx) return;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    if (type === 'key') {
      oscillator.frequency.setValueAtTime(600, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.07);
    } else if (type === 'win') {
      oscillator.stop(ctx.currentTime);
      const notes = [523, 659, 784, 1047];
      notes.forEach((freq, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
        g.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.12);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.2);
        o.start(ctx.currentTime + i * 0.12);
        o.stop(ctx.currentTime + i * 0.12 + 0.2);
      });
    } else if (type === 'lose') {
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(200, ctx.currentTime);
      oscillator.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.5);
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.5);
    } else if (type === 'hint') {
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(440, ctx.currentTime);
      oscillator.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.15);
      gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.15);
    }
  } catch { /* silent */ }
};

const buildShareText = (guesses: string[], solution: string, isWin: boolean): string => {
  const lines = guesses.map(guess =>
    guess.split('').map((letter, i) => {
      if (letter === solution[i]) return '🟩';
      if (solution.includes(letter)) return '🟨';
      return '⬛';
    }).join('')
  );
  const result = isWin ? `${guesses.length}/8` : 'X/8';
  const wordLine = isWin ? `Slovo: ${solution.toUpperCase()}` : `Slovo bylo: ${solution.toUpperCase()}`;
  return `KRYSTAL ${result}\n${wordLine}\n\n${lines.join('\n')}`;
};

// ─────────────────────────────────────────────────────────────────

export default function GameContainer() {
  const [wordEntry, setWordEntry] = useState<WordEntry>({ word: '', hint: '' });
  const solution = wordEntry.word;

  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [isRippling, setIsRippling] = useState(false);
  const [message, setMessage] = useState('');
  const [hintLetter, setHintLetter] = useState<string | undefined>(undefined);

  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [shareMessage, setShareMessage] = useState('');

  const [showStats, setShowStats] = useState(false);
  // Stats always come from server (per-user account)
  const [serverStats, setServerStats] = useState<LocalStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  const [dictionary, setDictionary] = useState<Set<string> | null>(null);

  const [showDailyConfirm, setShowDailyConfirm] = useState(false);
  const [isDailyChallenge, setIsDailyChallenge] = useState(false);
  const [dailyDeadline, setDailyDeadline] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [hasPlayedDailyToday, setHasPlayedDailyToday] = useState(false);

  const showMsg = (text: string, duration = 2500) => {
    setMessage(text);
    setTimeout(() => setMessage(''), duration);
  };

  // Load stats from server
  const loadServerStats = async () => {
    setStatsLoading(true);
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const data = await res.json();
        setServerStats(data);
      }
    } catch { /* silent */ } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    const dateStr = new Date().toISOString().split('T')[0];
    if (localStorage.getItem(`krystal_daily_played_${dateStr}`) === 'true') {
      setHasPlayedDailyToday(true);
    }

    loadServerStats();

    // Load dictionary
    (async () => {
      try {
        const res = await fetch('/dictionary.txt');
        const text = await res.text();
        const words = text.split('\n').map(w => w.trim().toLowerCase()).filter(w => w.length > 0);
        setDictionary(new Set(words));
      } catch { /* silent */ }
    })();

    // Load active game from localStorage
    const savedGame = localStorage.getItem('krystal_active_game');
    if (savedGame) {
      const d = JSON.parse(savedGame);
      if (d.solution?.length === 5) {
        if (d.isDailyChallenge && d.dailyDeadline) {
          const remaining = Math.max(0, Math.ceil((d.dailyDeadline - Date.now()) / 1000));
          if (!d.isGameOver && remaining <= 0) {
            d.isGameOver = true;
          } else if (!d.isGameOver) {
            setIsDailyChallenge(true);
            setDailyDeadline(d.dailyDeadline);
            setTimeLeft(remaining);
          }
        }

        setWordEntry({ word: d.solution, hint: d.hint || '' });
        setGuesses(d.guesses);
        setIsGameOver(d.isGameOver);
        setIsWin(d.isWin);
        setHintUsed(d.hintUsed || false);
        if (d.isGameOver) {
          showMsg(d.isWin ? '🎉 Uhodnuto!' : `Slovo bylo: ${d.solution.toUpperCase()}`, 4000);
        }
        return;
      }
    }
    startNewGame(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isDailyChallenge || !dailyDeadline || isGameOver || isWin) return;

    const remainingNow = Math.max(0, Math.ceil((dailyDeadline - Date.now()) / 1000));
    setTimeLeft(remainingNow);
    if (remainingNow <= 0) {
      handleFinalState(guesses, true, false);
      return;
    }

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((dailyDeadline - Date.now()) / 1000));
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        handleFinalState(guesses, true, false);
      }
    }, 1000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDailyChallenge, dailyDeadline, isGameOver, isWin, guesses]);

  const startNewGame = (isDaily = false) => {
    const entry = isDaily ? getDailyWord() : getRandomWord();
    setWordEntry(entry);
    setGuesses([]);
    setCurrentGuess('');
    setIsGameOver(false);
    setIsWin(false);
    setMessage('');
    setHintLetter(undefined);
    setShowHint(false);
    setHintUsed(false);
    setIsDailyChallenge(false);
    setDailyDeadline(null);
    setTimeLeft(null);
    localStorage.setItem('krystal_active_game', JSON.stringify({
      solution: entry.word, hint: entry.hint,
      guesses: [], isGameOver: false, isWin: false, hintUsed: false,
    }));
  };

  const startDailyTimeoutGame = () => {
    const entry = getDailyWord();
    setWordEntry(entry);
    setGuesses([]);
    setCurrentGuess('');
    setIsGameOver(false);
    setIsWin(false);
    setMessage('');
    setHintLetter(undefined);
    setShowHint(false);
    setHintUsed(false);
    
    setIsDailyChallenge(true);
    const deadline = Date.now() + 120 * 1000;
    setDailyDeadline(deadline);
    setTimeLeft(120);
    setShowDailyConfirm(false);

    const dateStr = new Date().toISOString().split('T')[0];
    localStorage.setItem(`krystal_daily_played_${dateStr}`, 'true');
    setHasPlayedDailyToday(true);

    localStorage.setItem('krystal_active_game', JSON.stringify({
      solution: entry.word, hint: entry.hint,
      guesses: [], isGameOver: false, isWin: false, hintUsed: false,
      isDailyChallenge: true, dailyDeadline: deadline
    }));
  };

  const onKey = useCallback((key: string) => {
    if (isGameOver || currentGuess.length >= solution.length) return;
    playSound('key');
    setCurrentGuess(prev => prev + key.toLowerCase());
  }, [isGameOver, currentGuess, solution.length]);

  const onDelete = useCallback(() => {
    if (isGameOver) return;
    setCurrentGuess(prev => prev.slice(0, -1));
  }, [isGameOver]);

  const onEnter = useCallback(async () => {
    if (isGameOver || currentGuess.length !== solution.length) return;

    if (dictionary && !dictionary.has(currentGuess.toLowerCase())) {
      showMsg('Slovo není v mém slovníku 🤔');
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 500);
      return;
    }

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    setCurrentGuess('');

    localStorage.setItem('krystal_active_game', JSON.stringify({
      solution, hint: wordEntry.hint, guesses: newGuesses,
      isGameOver: false, isWin: false, hintUsed,
      isDailyChallenge, dailyDeadline
    }));

    if (currentGuess === solution) {
      handleFinalState(newGuesses, true, true);
    } else if (newGuesses.length >= 8) {
      handleFinalState(newGuesses, true, false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameOver, currentGuess, solution, guesses, dictionary, hintUsed, wordEntry.hint]);

  const handleFinalState = (newGuesses: string[], over: boolean, win: boolean) => {
    setIsWin(win);
    setIsGameOver(over);

    if (win) {
      playSound('win');
      showMsg(`🎉 Uhodnuto na ${newGuesses.length}. pokus!`, 4000);
    } else {
      playSound('lose');
      showMsg(`Konec hry. Slovo bylo: ${solution.toUpperCase()}`, 5000);
    }

    localStorage.setItem('krystal_active_game', JSON.stringify({
      solution, hint: wordEntry.hint, guesses: newGuesses,
      isGameOver: over, isWin: win, hintUsed,
      isDailyChallenge, dailyDeadline
    }));

    // Save to server (per-user account)
    const points = solution.length * (9 - newGuesses.length);
    fetch('/api/stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        word: solution,
        attempts: newGuesses.length,
        points: win ? points : 0,
        isWin: win,
      }),
    }).then(() => loadServerStats()).catch(() => { /* silent */ });

    setTimeout(() => setShowStats(true), 2500);
  };

  const handleHint = () => {
    if (hintUsed || isGameOver) return;
    setHintUsed(true);
    setShowHint(true);
    playSound('hint');
    localStorage.setItem('krystal_active_game', JSON.stringify({
      solution, hint: wordEntry.hint, guesses, isGameOver, isWin, hintUsed: true,
    }));
  };

  const handleShare = async () => {
    const text = buildShareText(guesses, solution, isWin);
    try {
      await navigator.clipboard.writeText(text);
      setShareMessage('Zkopírováno! 📋');
    } catch {
      setShareMessage('Sdílení selhalo.');
    }
    setTimeout(() => setShareMessage(''), 2500);
  };

  const handleOpenStats = () => {
    loadServerStats();
    setShowStats(true);
  };

  const guessedLettersStatus = () => {
    const status: { [key: string]: 'correct' | 'present' | 'absent' | 'none' } = {};
    guesses.forEach(guess => {
      guess.split('').forEach((letter, i) => {
        if (letter === solution[i]) status[letter] = 'correct';
        else if (solution.includes(letter) && status[letter] !== 'correct') status[letter] = 'present';
        else if (!solution.includes(letter)) status[letter] = 'absent';
      });
    });
    return status;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showStats) return;
      if (e.key === 'Enter') onEnter();
      else if (e.key === 'Backspace') onDelete();
      else if (/^[a-záéíóúýčďěňřšťůž]$/i.test(e.key)) onKey(e.key);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKey, onDelete, onEnter, showStats]);

  return (
    <div className={`app-container ${isRippling ? 'ripple-effect' : ''}`}>

      {/* Top toast */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ y: -50, x: '-50%', opacity: 0 }} animate={{ y: 0, x: '-50%', opacity: 1 }} exit={{ y: -50, x: '-50%', opacity: 0 }}
            style={{
              position: 'fixed', top: '16px', left: '50%',
              zIndex: 100, background: '#1a1a1a', color: '#ffffff',
              padding: '10px 24px', borderRadius: '30px', fontSize: '0.85rem',
              fontWeight: '700', boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              whiteSpace: 'nowrap',
            }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share toast */}
      <AnimatePresence>
        {shareMessage && (
          <motion.div
            initial={{ y: 50, x: '-50%', opacity: 0 }} animate={{ y: 0, x: '-50%', opacity: 1 }} exit={{ y: 50, x: '-50%', opacity: 0 }}
            style={{
              position: 'fixed', bottom: '30px', left: '50%',
              zIndex: 100, background: '#27ae60', color: '#ffffff',
              padding: '10px 24px', borderRadius: '30px', fontSize: '0.85rem',
              fontWeight: '700', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', whiteSpace: 'nowrap',
            }}
          >
            {shareMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint popup */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowHint(false)}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.6)', zIndex: 200,
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }}
          >
            <motion.div
              initial={{ scale: 0.9 }} animate={{ scale: 1 }}
              style={{
                background: '#ffffff', borderRadius: '20px', padding: '32px 40px',
                maxWidth: '360px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>💡</div>
              <div style={{ fontSize: '0.75rem', color: '#888', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Nápověda</div>
              <p style={{ fontSize: '1.05rem', color: '#1a1a1a', lineHeight: '1.6', fontWeight: '500' }}>
                {wordEntry.hint}
              </p>
              <p style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '16px' }}>Klikni kamkoli pro zavření</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Daily confirm modal */}
      <AnimatePresence>
        {showDailyConfirm && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.8)', zIndex: 200,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              style={{
                background: '#ffffff', borderRadius: '20px', padding: '32px',
                maxWidth: '380px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
              }}
            >
              <Timer size={40} color="#8e44ad" style={{ marginBottom: '16px' }} />
              <h2 style={{ fontSize: '1.25rem', color: '#1a1a1a', marginBottom: '16px', fontWeight: '800' }}>Denní Výzva!</h2>
              <p style={{ fontSize: '1rem', color: '#444', lineHeight: '1.5', marginBottom: '24px' }}>
                Opravdu chceš spustit denní výzvu? Všichni hráči mají dnes stejné slovo.<br/><br/>
                <strong>Máš přesně 2 minuty</strong> na uhodnutí. Během této doby se ti bude odečítat čas.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                  onClick={() => setShowDailyConfirm(false)}
                  style={{
                    padding: '10px 20px', border: 'none', borderRadius: '20px',
                    background: '#ddd', color: '#333', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer'
                  }}
                >
                  Zrušit
                </button>
                <button
                  onClick={startDailyTimeoutGame}
                  style={{
                    padding: '10px 20px', border: 'none', borderRadius: '20px',
                    background: '#8e44ad', color: '#fff', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer'
                  }}
                >
                  Start!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back button */}
      <a
        href="https://sebian.cz"
        title="Zpět na hlavní stránku"
        style={{
          position: 'fixed', top: '24px', left: '24px',
          display: 'flex', alignItems: 'center', gap: '8px',
          color: '#666', textDecoration: 'none',
          fontWeight: '700', fontSize: '0.9rem',
          zIndex: 100, transition: 'color 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#1a1a1a'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        sebian.cz
      </a>

      <header>
        <div className="logo">KRYSTAL</div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Daily Timer Button / Display */}
          {isDailyChallenge ? (
            <div
              style={{
                padding: '8px 12px', borderRadius: '20px',
                background: (timeLeft !== null && timeLeft <= 10) ? '#e74c3c' : '#34495e',
                color: '#fff', fontSize: '0.85rem', fontWeight: '800',
                display: 'flex', alignItems: 'center', gap: '5px',
                fontFamily: 'monospace'
              }}
            >
              <Timer size={15} /> {Math.floor((timeLeft || 0) / 60).toString().padStart(2, '0')}:{(Math.floor(timeLeft || 0) % 60).toString().padStart(2, '0')}
            </div>
          ) : hasPlayedDailyToday ? (
            <button
              disabled
              title="Dnešní výzvu už máš za sebou!"
              style={{
                padding: '8px 12px', border: 'none', borderRadius: '20px',
                background: '#555', color: '#999', fontSize: '0.75rem', fontWeight: '700',
                display: 'flex', alignItems: 'center', gap: '5px', cursor: 'not-allowed',
              }}
            >
              <Timer size={15} /> <span className="action-text">Odehráno</span>
            </button>
          ) : (
            <button
              onClick={() => setShowDailyConfirm(true)}
              title="Spustit denní výzvu (2 minuty!)"
              style={{
                padding: '8px 12px', border: 'none', borderRadius: '20px',
                background: '#8e44ad', color: '#fff', fontSize: '0.75rem', fontWeight: '700',
                display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer',
              }}
            >
              <Timer size={15} /> <span className="action-text">Daily</span>
            </button>
          )}

          {/* Hint */}
          {!isGameOver && (
            <button
              onClick={handleHint}
              title={hintUsed ? 'Nápověda již použita' : 'Zobrazit nápovědu (1× za hru)'}
              style={{
                padding: '8px 12px', border: 'none', borderRadius: '20px',
                background: hintUsed ? '#ddd' : '#f39c12',
                color: hintUsed ? '#999' : '#fff', fontSize: '0.75rem', fontWeight: '700',
                display: 'flex', alignItems: 'center', gap: '5px',
                cursor: hintUsed ? 'not-allowed' : 'pointer',
              }}
            >
              <Lightbulb size={15} />
              {hintUsed ? <span className="action-text">Použita</span> : <span className="action-text">Nápověda</span>}
            </button>
          )}

          {/* Share + Next word (game over) */}
          {isGameOver && (
            <>
              <button
                onClick={handleShare}
                style={{
                  padding: '8px 12px', border: 'none', borderRadius: '20px',
                  background: '#2980b9', color: '#fff', fontSize: '0.75rem', fontWeight: '700',
                  display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer',
                }}
              >
                <Share2 size={15} /> <span className="action-text">Sdílet</span>
              </button>
              <button
                onClick={() => startNewGame()}
                style={{
                  padding: '8px 12px', border: 'none', borderRadius: '20px',
                  background: '#27ae60', color: '#fff', fontSize: '0.75rem', fontWeight: '700',
                  display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer',
                }}
              >
                <RefreshCw size={15} /> <span className="action-text">Další slovo</span>
              </button>
            </>
          )}

          {/* Stats */}
          <button
            onClick={handleOpenStats}
            title="Statistiky"
            style={{
              padding: '8px', border: 'none', borderRadius: '12px',
              background: '#1a1a1a', color: '#fff', cursor: 'pointer',
              display: 'flex', alignItems: 'center',
            }}
          >
            <BarChart2 size={20} />
          </button>

          {/* Logout */}
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            title="Odhlásit se"
            style={{
              padding: '8px', border: 'none', borderRadius: '12px',
              background: '#e74c3c', color: '#fff', cursor: 'pointer',
              display: 'flex', alignItems: 'center', marginLeft: '4px'
            }}
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <main>
        <Grid
          guesses={guesses}
          currentGuess={currentGuess}
          solution={solution}
          isGameOver={isGameOver}
          wordLength={5}
        />
        <Keyboard
          onKey={onKey}
          onDelete={onDelete}
          onEnter={onEnter}
          guessedLetters={guessedLettersStatus()}
          hintLetter={hintLetter}
        />
      </main>

      <AnimatePresence>
        {showStats && (
          <StatsModal
            stats={serverStats}
            loading={statsLoading}
            onClose={() => setShowStats(false)}
          />
        )}
      </AnimatePresence>

      <div style={{ paddingBottom: '1rem', textAlign: 'center', color: '#999', fontSize: '0.75rem' }}>
        KRYSTAL • Česká slovní hra
      </div>
    </div>
  );
}
