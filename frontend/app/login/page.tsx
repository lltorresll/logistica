"use client";
import LoginForm from "../../components/auth/LoginForm";
import styles from "../../styles/Login.module.css";

export default function LoginPage() {
  return (
    <main className={styles.container}>
      <LoginForm />
    </main>
  );
}
