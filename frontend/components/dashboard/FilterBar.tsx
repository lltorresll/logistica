import styles from "@/styles/Dashboard.module.css";

interface Props {
  filters: any;
  setFilters: (f: any) => void;
  options: any;
}

export default function FilterBar({ filters, setFilters, options }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <section className={styles.filterSection}>
      <div className={styles.filterContainer}>
        
        {/* FILTRO POR LÍNEA */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Línea</label>
          <select name="product_line" className={styles.filterSelect} value={filters.product_line} onChange={handleChange}>
            <option value="">Todas las Líneas</option>
            {options.product_lines?.map((p: any) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>

        {/* FILTRO POR ESTADO */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Estado</label>
          <select name="status" className={styles.filterSelect} value={filters.status} onChange={handleChange}>
            <option value="">Todos los Estados</option>
            <option value="Programada">Programada</option>
            <option value="En proceso">En proceso</option>
            <option value="Entregada">Entregada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>

        {/* FILTROS DE RANGO DE TIEMPO */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Desde</label>
          <input 
            type="date" 
            name="date_from" 
            className={styles.filterInput} 
            value={filters.date_from || ''} 
            onChange={handleChange} 
          />
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Hasta</label>
          <input 
            type="date" 
            name="date_to" 
            className={styles.filterInput} 
            value={filters.date_to || ''} 
            onChange={handleChange} 
          />
        </div>
        
      </div>
    </section>
  );
}