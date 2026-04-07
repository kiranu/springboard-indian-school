/**
 * Preloader.tsx
 * Playful preschool-themed page loader for Springboard Indian School
 *
 * Features:
 *  - Smiling floating sun with rays
 *  - Drifting clouds
 *  - Twinkling coloured stars
 *  - Bouncing balls on a green ground strip
 *  - Logo card with bobbing animation
 *  - "Getting Things Ready…" text + colour-dot progress indicator
 *  - Smooth fade-out after minimum display time
 *  - Locks body scroll while visible
 *  - Respects prefers-reduced-motion
 */

import { useState, useEffect } from 'react'
import styles from './Preloader.module.css'

/* ─────────────────────────────────────────────────────────────
   Config — edit these to customise the loader
───────────────────────────────────────────────────────────── */
const CONFIG = {
  /** Minimum time (ms) the loader stays on screen — feels intentional */
  minDisplayMs: 2000,
  /** Duration (ms) of the fade-out transition */
  fadeDurationMs: 650,
  /** Loading message */
  text: 'Getting Things Ready…',
  /** Show the school logo */
  showLogo: true,
} as const

/** Ball colours — left-to-right across the ground strip */
const BALL_COLORS = ['#FF6B6B', '#FFD43B', '#69DB7C', '#74C0FC', '#B197FC', '#F783AC']

/** Progress-dot colours */
const DOT_COLORS = ['#FF6B6B', '#FFD43B', '#69DB7C']

/* ─────────────────────────────────────────────────────────────
   Sub-components — inline SVGs keep the bundle tiny
───────────────────────────────────────────────────────────── */

/** Smiling sun with 8 radiating rays */
function SunSVG() {
  const RAY_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315]
  return (
    <svg
      viewBox="0 0 80 80"
      width="88"
      height="88"
      aria-hidden="true"
      focusable="false"
    >
      {/* Rays — each is a line rotated around the centre (40,40) */}
      {RAY_ANGLES.map((deg) => (
        <g key={deg} transform={`rotate(${deg}, 40, 40)`}>
          <line
            x1="40" y1="4"
            x2="40" y2="15"
            stroke="#FFD43B"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        </g>
      ))}

      {/* Face body */}
      <circle cx="40" cy="40" r="22" fill="#FFD43B" stroke="#FFA94D" strokeWidth="1.5" />

      {/* Eyes */}
      <circle cx="33" cy="36" r="3.2" fill="#5C4A1E" />
      <circle cx="47" cy="36" r="3.2" fill="#5C4A1E" />
      {/* Eye highlights */}
      <circle cx="34.5" cy="34.5" r="1.2" fill="white" />
      <circle cx="48.5" cy="34.5" r="1.2" fill="white" />

      {/* Smile */}
      <path
        d="M31 46 Q40 55 49 46"
        stroke="#5C4A1E"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Rosy cheeks */}
      <circle cx="27" cy="44" r="5.5" fill="#F783AC" opacity="0.38" />
      <circle cx="53" cy="44" r="5.5" fill="#F783AC" opacity="0.38" />
    </svg>
  )
}

/** Fluffy cloud built from overlapping circles */
function CloudSVG({ width = 110, height = 65 }: { width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 110 65"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="28"  cy="46" r="23"  fill="white" />
      <circle cx="54"  cy="33" r="30"  fill="white" />
      <circle cx="83"  cy="44" r="21"  fill="white" />
      <rect   x="7"   y="44"  width="96" height="21" rx="2" fill="white" />
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────
   Main Preloader component
───────────────────────────────────────────────────────────── */
interface PreloaderProps {
  /** Override minimum display time */
  minDisplayMs?: number
  /** Override loading text */
  text?: string
  /** Show / hide the logo */
  showLogo?: boolean
}

type Phase = 'visible' | 'fading' | 'gone'

export default function Preloader({
  minDisplayMs = CONFIG.minDisplayMs,
  text         = CONFIG.text,
  showLogo     = CONFIG.showLogo,
}: PreloaderProps) {
  const [phase, setPhase] = useState<Phase>('visible')

  useEffect(() => {
    // Lock scroll while the loader is on screen
    document.body.style.overflow = 'hidden'

    let removeTimer: ReturnType<typeof setTimeout>

    const fadeTimer = setTimeout(() => {
      // Step 1: begin CSS fade-out
      setPhase('fading')

      // Step 2: unmount after animation finishes
      removeTimer = setTimeout(() => {
        setPhase('gone')
        document.body.style.overflow = ''
      }, CONFIG.fadeDurationMs)
    }, minDisplayMs)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
      document.body.style.overflow = ''
    }
  }, [minDisplayMs])

  if (phase === 'gone') return null

  return (
    <div
      className={`${styles.overlay} ${phase === 'fading' ? styles.fadeOut : ''}`}
      role="status"
      aria-label="Page is loading, please wait"
      aria-live="polite"
    >
      {/* ── Twinkling stars ───────────────────────────────── */}
      {Array.from({ length: 10 }).map((_, i) => (
        <span
          key={i}
          className={`${styles.star} ${styles[`s${i}` as keyof typeof styles]}`}
          aria-hidden="true"
        >
          {i % 3 === 0 ? '✦' : i % 3 === 1 ? '✧' : '⋆'}
        </span>
      ))}

      {/* ── Sun ─────────────────────────────────────────── */}
      <div className={styles.sun} aria-hidden="true">
        <SunSVG />
      </div>

      {/* ── Clouds ──────────────────────────────────────── */}
      <div className={`${styles.cloud} ${styles.cloudL}`}  aria-hidden="true">
        <CloudSVG width={126} height={75} />
      </div>
      <div className={`${styles.cloud} ${styles.cloudR}`}  aria-hidden="true">
        <CloudSVG width={100} height={60} />
      </div>
      <div className={`${styles.cloud} ${styles.cloudL2}`} aria-hidden="true">
        <CloudSVG width={78} height={47} />
      </div>

      {/* ── Centre card ─────────────────────────────────── */}
      <div className={styles.card}>
        {showLogo && (
          <div className={styles.logoWrap}>
            <img
              src="/assets/img/springboard-logo.png"
              alt="Springboard Indian School"
              className={styles.logoImg}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          </div>
        )}

        {/* Loading text */}
        <p className={styles.text}>{text}</p>

        {/* Colour-coded progress dots */}
        <div className={styles.dots} aria-hidden="true">
          {DOT_COLORS.map((color, i) => (
            <span
              key={i}
              className={styles.dot}
              style={{
                '--dot-color': color,
                '--dot-delay': `${i * 0.22}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

      {/* ── Green ground strip ──────────────────────────── */}
      <div className={styles.ground} aria-hidden="true" />

      {/* ── Bouncing balls ──────────────────────────────── */}
      <div className={styles.balls} aria-hidden="true">
        {BALL_COLORS.map((color, i) => (
          <div
            key={i}
            className={styles.ball}
            style={{
              '--ball-color': color,
              '--ball-delay': `${i * 0.18}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  )
}
