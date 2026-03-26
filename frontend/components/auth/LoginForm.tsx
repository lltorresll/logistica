'use client';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import styles from '../../styles/Login.module.css';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const { loginUser, loading, errorMsg } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    await loginUser(username, password);
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Sistema de Citas</h2>
      <p className={styles.subtitle}>Ingresa tus credenciales para continuar</p>

      {errorMsg && <div className={styles.errorBox}>{errorMsg}</div>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="username">Usuario</label>
          <input
            className={styles.input}
            id="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Tu usuario"
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="password">Contraseña</label>
          <input
            className={styles.input}
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <button 
          className={styles.button} 
          type="submit" 
          disabled={loading}
        >
          {loading ? 'Verificando...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
}