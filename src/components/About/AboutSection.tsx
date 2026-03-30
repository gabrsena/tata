import AboutVideo from './AboutVideo';
import styles from '@/app/page.module.css';

export default function AboutSection() {
  return (
    <section id="sobre" className={styles.sobreSection}>
      {/* Background atmosphere */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', background: '#E8E2D4' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 0%, rgba(215, 198, 168, 0.2) 50%, transparent 100%)' }} />
        <div className={styles.grainOverlay} />
      </div>

      <div className={styles.sobreContainer}>
        {/* Eyebrow */}
        <div className={styles.sobreEyebrow}>
          <span className={styles.sobreEyebrowLabel}>Sobre Mim</span>
          <div className={styles.sobreEyebrowLine} />
        </div>

        {/* Grid */}
        <div className={styles.sobreGrid}>
          {/* Texto - Visibilidade Imediata */}
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

          {/* Vídeo - Componente Cliente Isolado */}
          <AboutVideo />
        </div>
      </div>
    </section>
  );
}
