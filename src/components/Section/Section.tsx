import styles from './Section.module.css';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  dark?: boolean;
}

export default function Section({ id, title, children, dark }: SectionProps) {
  return (
    <section 
      id={id} 
      className={`${styles.section} ${dark ? styles.dark : ''}`}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </section>
  );
}
