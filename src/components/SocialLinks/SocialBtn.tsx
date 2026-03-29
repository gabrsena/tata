import styles from './SocialLinks.module.css';
import { ReactNode } from 'react';

interface SocialBtnProps {
  href: string;
  label: string;
  videoSrc: string; // Keeping for interface compatibility but won't use
  icon?: ReactNode;
  isComingSoon?: boolean;
}

export default function SocialBtn({ href, label, icon, isComingSoon }: SocialBtnProps) {
  return (
    <a 
      href={isComingSoon ? undefined : href} 
      target={isComingSoon ? undefined : "_blank"} 
      rel={isComingSoon ? undefined : "noopener noreferrer"} 
      className={`${styles.socialBtn} ${isComingSoon ? styles.comingSoon : ''}`}
      style={{ cursor: isComingSoon ? 'default' : 'pointer' }}
    >
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
