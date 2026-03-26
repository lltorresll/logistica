import styles from "@/styles/Dashboard.module.css";

interface Props {
  stats: { total_appointments: number; avg_delay_hours: number };
}

export default function StatsCards({ stats }: Props) {
  return (
    <div className={styles.statsGrid}>
      <div className={styles.statCard}>
        <span className={styles.statLabel}>Citas Activas</span>
        <h2 className={styles.statValue}>{stats.total_appointments}</h2>
      </div>
      <div className={styles.statCard}>
        <span className={styles.statLabel}>Cumplimiento Promedio</span>
        <h2 className={styles.statValue}>
          {stats.avg_delay_hours > 0 ? `+${stats.avg_delay_hours}h` : "A tiempo"}
        </h2>
      </div>
    </div>
  );
}