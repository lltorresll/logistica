import React, { useState, useEffect } from "react";
import {
  appointmentService,
  AppointmentData,
} from "@/services/appointmentService";
import styles from "../../styles/Modal.module.css";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
  initialData?: any;
}

const CreateAppointmentModal = ({
  isOpen,
  onClose,
  onSuccess,
  initialData,
}: Props) => {
  const [options, setOptions] = useState({ suppliers: [], product_lines: [] });
  const [formData, setFormData] = useState<AppointmentData>({
    scheduled_at: "",
    supplier: "",
    product_line: "",
    observations: "",
    status: "Programada",
  });

  const isEditing = !!initialData;

  useEffect(() => {
    if (isOpen) {
      appointmentService.getLookups().then(setOptions).catch(console.error);

      if (initialData) {
        setFormData({
          ...initialData,
          scheduled_at: initialData.scheduled_at
            ? initialData.scheduled_at.substring(0, 16)
            : "",
        });
      } else {
        setFormData({
          scheduled_at: "",
          supplier: "",
          product_line: "",
          observations: "",
          status: "Programada",
        });
      }
    }
  }, [isOpen, initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await appointmentService.updateAppointment(initialData.id, formData);
        onSuccess("¡Cita actualizada!");
      } else {
        await appointmentService.createAppointment(formData);
        onSuccess("¡Cita agendada!");
      }
    } catch (error: any) {
      toast.error("Error al guardar");
    }
  };

  const handleCancelAppointment = async () => {
    if (confirm("¿Mano, seguro que querés cancelar esta cita?")) {
      try {
        await appointmentService.updateAppointment(initialData.id, {
          status: "Cancelada",
        });
        onSuccess("La cita ha sido cancelada exitosamente.");
      } catch (error) {
        toast.error("No se pudo cancelar la cita.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>
          {isEditing ? "Detalle de Cita" : "Nueva Cita"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Fecha y Hora Programada</label>
            <input
              type="datetime-local"
              name="scheduled_at"
              className={styles.input}
              value={formData.scheduled_at}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Proveedor</label>
            <select
              name="supplier"
              className={styles.select}
              value={formData.supplier}
              onChange={handleInputChange}
              required
              disabled={isEditing}
            >
              <option value="">Seleccione proveedor...</option>
              {options.suppliers.map((s: any) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Línea de Producto</label>
            <select
              name="product_line"
              className={styles.select}
              value={formData.product_line}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione línea...</option>
              {options.product_lines.map((p: any) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {isEditing && (
            <div className={styles.formGroup}>
              <label className={styles.label}>Estado de la Entrega</label>
              <select
                name="status"
                className={styles.select}
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="Programada">Programada</option>
                <option value="En proceso">En proceso</option>
                <option value="Entregada">Entregada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.label}>Observaciones / Notas</label>
            <textarea
              name="observations"
              className={styles.textarea}
              value={formData.observations}
              onChange={handleInputChange}
              placeholder="Ej: Placa del camión, nombre del conductor..."
            />
          </div>

          <div className={styles.modalActions}>
            <div className={styles.leftActions}>
              {isEditing &&
                formData.status !== "Cancelada" &&
                formData.status !== "Entregada" && (
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={handleCancelAppointment}
                  >
                    Cancelar Cita
                  </button>
                )}
            </div>
            <div className={styles.rightActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={onClose}
              >
                Cerrar
              </button>
              <button type="submit" className={styles.saveButton}>
                {isEditing ? "Guardar Cambios" : "Agendar Cita"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAppointmentModal;
