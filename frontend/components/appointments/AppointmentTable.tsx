import React from "react";
import styles from "../../styles/AppointmentTable.module.css";

interface Props {
  data: any[];
  onViewDetail: (appointment: any) => void;
}

const AppointmentTable = ({ data, onViewDetail }: Props) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Programada":
        return styles.statusProgramada;
      case "En proceso":
        return styles.statusProceso;
      case "Entregada":
        return styles.statusEntregada;
      case "Cancelada":
        return styles.statusCancelada;
      default:
        return styles.statusDefault;
    }
  };

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Fecha/Hora</th>
            <th className={styles.th}>Proveedor</th>
            <th className={styles.th}>Línea</th>
            <th className={styles.th}>Estado</th>
            <th className={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((app) => (
            <tr key={app.id} className={styles.tr}>
              <td className={styles.td}>
                {new Date(app.scheduled_at).toLocaleString("es-CO", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </td>
              <td className={styles.td}>{app.supplier}</td>
              <td className={styles.td}>{app.product_line}</td>
              <td className={styles.td}>
                <span
                  className={`${styles.badge} ${getStatusClass(app.status)}`}
                >
                  {app.status}
                </span>
              </td>
              <td className={styles.td}>
                <button
                  className={styles.editBtn}
                  onClick={() => onViewDetail(app)}
                >
                  Ver Detalle
                </button>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={5} className={styles.emptyTd}>
                No hay citas programadas con estos filtros.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
