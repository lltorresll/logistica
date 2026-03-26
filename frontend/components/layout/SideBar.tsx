'use client';

import { authService } from '../../services/authService';
import styles from '../../styles/Sidebar.module.css';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span>📦 Logistica X</span>
      </div>
      
      <nav className={styles.nav}>
        <div className={`${styles.navItem} ${styles.navItemActive}`}>
          📅 Mis Citas
        </div>
        <div className={styles.navItem}>
          ⚙️ Configuración
        </div>
      </nav>

      <button className={styles.logoutBtn} onClick={authService.logout}>
        Cerrar Sesión
      </button>
    </aside>
  );
}