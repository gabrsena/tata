import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : styles.transparent}`}>
        <div className={styles.container}>
          <div className={styles.spacer} /> {/* Espaçador no lugar do logo */}
          
          <div className={styles.desktopLinks}>
            <Link href="#sobre" className={scrolled ? styles.darkLink : styles.lightLink}>SOBRE MIM</Link>
            <Link href="#missao-v4" className={`${styles.btnLink} ${scrolled ? styles.darkLink : styles.lightLink}`}>MISSÕES</Link>
          </div>

          <button className={styles.menuButton} onClick={toggleMenu} aria-label="Toggle Menu">
            {isMenuOpen ? <RiCloseLine size={28} /> : <RiMenu3Line size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${isMenuOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerContent}>
          <Link href="#sobre" onClick={toggleMenu}>SOBRE MIM</Link>
          <Link href="#missao-v4" onClick={toggleMenu}>MISSÕES</Link>
          
          <div className={styles.drawerFooter}>
            <p>© 2026 Tata. stick to the plan.</p>
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      {isMenuOpen && <div className={styles.overlay} onClick={toggleMenu} />}
    </>
  );
}
