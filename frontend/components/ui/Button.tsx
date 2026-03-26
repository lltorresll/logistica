import styles from '../../styles/Button.module.css';

interface ButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export default function Button({ label, icon, onClick, type = 'button', variant = 'primary', disabled }: ButtonProps) {
  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled}
      className={`${styles.button} ${styles[variant]}`}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {label}
    </button>
  );
}