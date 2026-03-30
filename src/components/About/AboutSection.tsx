'use client';

import { FaPlay } from 'react-icons/fa';
import styles from '@/app/page.module.css';

interface AboutSectionProps {
  aboutSectionRef: React.RefObject<HTMLElement | null>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  videoPlaying: boolean;
  toggleVideo: () => void;
  fadeAudio: (vol: number) => void;
  setVideoPlaying: (playing: boolean) => void;
}

export default function AboutSection({
  aboutSectionRef,
  videoRef,
  videoPlaying,
  toggleVideo,
  fadeAudio,
  setVideoPlaying
}: AboutSectionProps) {
  return (
    <section id="sobre" ref={aboutSectionRef} className={styles.sobreSection}>
      {/* Background atmosphere */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', background: '#E8E2D4' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 0%, rgba(215, 198, 168, 0.2) 50%, transparent 100%)' }} />
        <div className={styles.grainOverlay} />
      </div>

      <div className={`${styles.sobreContainer} reveal`}>
        {/* Eyebrow */}
        <div className={styles.sobreEyebrow}>
          <span className={styles.sobreEyebrowLabel}>Sobre Mim</span>
          <div className={styles.sobreEyebrowLine} />
        </div>

        {/* Grid */}
        <div className={styles.sobreGrid}>
          {/* Texto */}
          <div className={styles.sobreTextColumn}>
            <h2 className={styles.sobreTitle}>
              Apaixonada por Jesus.
            </h2>
            <p className={styles.sobreParagraph}>
              Oi, eu sou a Tata. Tenho 28 anos e, acima de tudo, sou apaixonada por Jesus.
            </p>
            <p className={styles.sobreParagraph}>
              Atualmente, vivo missões em tempo integral pela Dunamis School of Ministry, mas o meu coração não sossega aqui. Por isso te convido a acompanhar o início dessa minha jornada como missionária e também fazer parte dela.
            </p>
            <blockquote className={styles.sobreVerse}>
              <p className={styles.sobreVerseText}>
                "Mas recebereis poder ao descer sobre vós o Espírito Santo; e ser-me-eis testemunhas tanto em Jerusalém como em toda a Judéia e Samaria e até aos confins da terra." Atos 1:8
              </p>
            </blockquote>
          </div>

          {/* Vídeo */}
          <div className={styles.sobreVideoColumn}>
            <div className={styles.sobreVideoDecor} />
            <div className={styles.sobreVideoWrapper} onClick={toggleVideo}>
                <video
                  ref={videoRef}
                  loop
                  playsInline
                  preload="none"
                className={styles.sobreVideo}
                onPlay={() => { setVideoPlaying(true); fadeAudio(0.05); }}
                onPause={() => { setVideoPlaying(false); fadeAudio(0.4); }}
                onEnded={() => { setVideoPlaying(false); fadeAudio(0.4); }}
              >
                <source src="/sobre.webm" type="video/webm" />
                <source src="/sobre.MOV" type="video/quicktime" />
                <source src="/sobre.MOV" type="video/mp4" />
              </video>
              {!videoPlaying && (
                <div className={styles.sobrePlayOverlay}>
                  <FaPlay size={30} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
