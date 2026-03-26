"use client";
import { useState, useEffect } from "react";
import api from "@/services/api";
import styles from "../../styles/Dashboard.module.css";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function EfficiencyReport() {
  const [data, setData] = useState([]);
  const [refreshSecs, setRefreshSecs] = useState(30);

  const fetchReport = async () => {
    try {
      const res = await api.get("/appointments/report/", {
        params: { date_from: "2026-01-01", date_to: "2026-12-31" },
      });
      setData(res.data);
    } catch (e) {
      console.error("Error reporte SQL", e);
    }
  };

  useEffect(() => {
    fetchReport();
    const interval = setInterval(fetchReport, refreshSecs * 1000);
    return () => clearInterval(interval);
  }, [refreshSecs]);

  return (
    <div className={styles.reportContainer}>
      <div className={styles.reportHeader}>
        <h3>Eficiencia por Línea de Producto (SQL Nativo)</h3>
        <div className={styles.refreshControl}>
          <label>Auto-refresh (s): </label>
          <input
            type="number"
            value={refreshSecs}
            onChange={(e) => setRefreshSecs(Number(e.target.value))}
          />
        </div>
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="product_line" />
            <YAxis
              label={{ value: "Horas", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Bar
              dataKey="avg_hours"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              name="Promedio Horas"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <table className={styles.reportTable}>
        <thead>
          <tr>
            <th>Línea</th>
            <th>Entregas</th>
            <th>Prom. Horas</th>
            <th>Prom. Minutos</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item.product_line}>
              <td>{item.product_line}</td>
              <td>{item.total_deliveries}</td>
              <td>{item.avg_hours}h</td>
              <td>{item.avg_minutes}m</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
