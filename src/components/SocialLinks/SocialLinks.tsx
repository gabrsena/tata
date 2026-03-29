import styles from './SocialLinks.module.css';
import SocialBtn from './SocialBtn';
import { SiWhatsapp, SiInstagram, SiTiktok, SiYoutube } from 'react-icons/si';
import { FaGlobe } from 'react-icons/fa';

export default function SocialLinks() {
  const links = [
    { 
      label: 'me acompanhe no whats', 
      href: 'https://chat.whatsapp.com/Dva6hFlYV4w2BH2DhRhQ0O?mode=gi_t', 
      videoSrc: '/video 2.mov', 
      icon: <SiWhatsapp size={18} /> 
    },
    { 
      label: 'instagram', 
      href: 'https://www.instagram.com/tata.sena?igsh=bWh5NDQ3dGkxcTI5&utm_source=qr', 
      videoSrc: '/video 3.mov', 
      icon: <SiInstagram size={18} /> 
    },
    { 
      label: 'youtube', 
      href: 'https://youtube.com/@canaldatatasena?si=hWTT6O-1Abwj6Suu', 
      videoSrc: '/black.mov', 
      icon: <SiYoutube size={18} /> 
    },
    { 
      label: 'mission project', 
      href: '#', 
      videoSrc: '/video 4.mov', 
      icon: <FaGlobe size={18} />,
      isComingSoon: true
    },
  ];

  return (
    <div className={styles.grid}>
      {links.map((link) => (
        <SocialBtn key={link.label} {...link} />
      ))}
    </div>
  );
}
