import { useCallback, useEffect, useState } from 'react';
import { IMAGES } from '../../data/machines';

let hasPlayedIntro = false;
const WORDS = ['IMA', 'FAR', 'EAST', 'LTD.'];
const INTRO_DURATION_MS = 3000;

export function CinematicIntro({
  forcePlay = false,
  onFinish,
}: {
  forcePlay?: boolean;
  onFinish?: () => void;
}) {
  const [state, setState] = useState<'play' | 'exit' | 'done'>(
    !forcePlay && hasPlayedIntro ? 'done' : 'play',
  );
  const [progress, setProgress] = useState(0);

  const finish = useCallback(() => {
    hasPlayedIntro = true;
    document.documentElement.style.overflow = '';
    setState('done');
    onFinish?.();
  }, [onFinish]);

  useEffect(() => {
    if (!forcePlay && hasPlayedIntro) return;
    setState('play');
    document.documentElement.style.overflow = 'hidden';

    const startTime = performance.now();
    const interval = window.setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, (elapsed / INTRO_DURATION_MS) * 100);
      setProgress(pct);
    }, 30);

    const exitTimer = window.setTimeout(() => {
      setState('exit');
    }, INTRO_DURATION_MS - 420);

    const doneTimer = window.setTimeout(finish, INTRO_DURATION_MS);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        finish();
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [forcePlay, finish]);

  if (state === 'done') return null;

  let charIndex = 0;

  return (
    <div
      onClick={finish}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#040710] text-white cursor-pointer ${
        state === 'exit' ? 'animate-intro-exit' : ''
      }`}
      onAnimationEnd={(e) => {
        if (state === 'exit' && e.target === e.currentTarget) finish();
      }}
      role="presentation"
    >
      {/* Subtle Luxury Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 studio-luxury opacity-80 animate-intro-glow" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[420px] sm:size-[580px] rounded-full blur-3xl opacity-55"
        style={{
          background:
            'radial-gradient(circle, rgba(16,185,129,0.22) 0%, rgba(59,130,246,0.14) 45%, rgba(206,43,55,0.18) 75%, transparent 100%)',
        }}
      />

      {/* Centered Company Logo & Company Name Only */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
        <div
          className="mb-7 relative flex items-center justify-center animate-intro-fade-up"
          style={{ animationDelay: '0.05s' }}
        >
          <div className="absolute -inset-6 rounded-full bg-emerald-500/20 blur-2xl animate-pulse" />
          <img
            src={IMAGES.ifelLogo}
            alt="IMA Far East Ltd."
            referrerPolicy="no-referrer"
            className="relative size-36 sm:size-44 md:size-52 object-contain drop-shadow-[0_14px_42px_rgba(0,0,0,0.75)]"
          />
        </div>

        <h1
          aria-label="IMA FAR EAST LTD."
          className="wordmark flex flex-wrap justify-center gap-x-[0.42em] gap-y-2 text-[clamp(1.65rem,5vw,5.25rem)] leading-none text-white animate-intro-track"
        >
          {WORDS.map((word) => (
            <span key={word} className="inline-flex" aria-hidden={true}>
              {word.split('').map((char) => {
                const delay = 0.1 + charIndex++ * 0.025;
                return (
                  <span
                    key={`${word}-${charIndex}`}
                    className="inline-block animate-intro-letter"
                    style={{ animationDelay: `${delay}s` }}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        {/* Clean Tricolore Underline Progress Bar */}
        <div className="mt-8 h-[3px] w-[min(360px,70vw)] overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full bg-gradient-to-r from-[#009246] via-white to-[#CE2B37] transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
