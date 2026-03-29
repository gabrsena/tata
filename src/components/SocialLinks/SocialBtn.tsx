import { useRef } from 'react';
import styles from './SocialLinks.module.css';
import { ReactNode } from 'react';

interface SocialBtnProps {
  href: string;
  label: string;
  videoSrc: string;
  icon?: ReactNode;
  isComingSoon?: boolean;
}

export default function SocialBtn({ href, label, videoSrc, icon, isComingSoon }: SocialBtnProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current && !isComingSoon) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && !isComingSoon) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset to start
    }
  };

  // Helper to get webm version
  const getWebmSrc = (src: string) => {
    return src.replace(/\.(mov|MOV|mp4|MP4)$/, '.webm');
  };

  return (
    <a 
      href={isComingSoon ? undefined : href} 
      target={isComingSoon ? undefined : "_blank"} 
      rel={isComingSoon ? undefined : "noopener noreferrer"} 
      className={`${styles.socialBtn} ${isComingSoon ? styles.comingSoon : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: isComingSoon ? 'default' : 'pointer' }}
    >
      <video 
        ref={videoRef}
        muted 
        loop 
        playsInline 
        className={styles.btnVideo}
      >
        <source src={getWebmSrc(videoSrc)} type="video/webm" />
        <source src={videoSrc} type="video/quicktime" />
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className={styles.btnOverlay} />
      <div className={styles.btnContent}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.label}>{label}</span>
        {isComingSoon && (
          <span className={styles.comingSoonBadge}>EM BREVE</span>
        )}
      </div>
    </a>
  );
}
