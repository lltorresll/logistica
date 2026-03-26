import Button from "@/components/ui/Button";
import styles from "@/styles/Dashboard.module.css";

interface Props {
  user: { username: string } | null;
  onNew: () => void;
}

export default function DashboardHeader({ user, onNew }: Props) {
  return (
    <header className={styles.topBar}>
      <div>
        <h1 className={styles.title}>Dashboard</h1>
        <p>Bienvenido{user ? `, ${user.username}` : ''}. Gestiona tus entregas.</p>
      </div>
      <Button label="Nueva Cita" icon="📅" onClick={onNew} />
    </header>
  );
}