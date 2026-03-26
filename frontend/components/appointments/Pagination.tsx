import styles from "../../styles/Pagination.module.css";

interface Props {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalItems, pageSize, onPageChange }: Props) {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <button 
        disabled={currentPage === 1} 
        onClick={() => onPageChange(currentPage - 1)}
        className={styles.pageBtn}
      >
        Anterior
      </button>
      <span className={styles.pageInfo}>
        Página <strong>{currentPage}</strong> de {totalPages}
      </span>
      <button 
        disabled={currentPage === totalPages} 
        onClick={() => onPageChange(currentPage + 1)}
        className={styles.pageBtn}
      >
        Siguiente
      </button>
    </div>
  );
}