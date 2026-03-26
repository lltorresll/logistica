"use client";
import { useState, useEffect } from "react";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { useDashboard } from "../../hooks/useDashboard";
import Sidebar from "@/components/layout/SideBar";
import AppointmentTable from "../../components/appointments/AppointmentTable";
import Pagination from "@/components/appointments/Pagination";
import EfficiencyChart from "../../components/appointments/EfficiencyChart";
import CreateAppointmentModal from "../../components/appointments/CreateAppointmentModal";

import styles from "@/styles/Dashboard.module.css";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCards from "@/components/dashboard/StatsCards.tsx";
import FilterBar from "@/components/dashboard/FilterBar";

export default function DashboardPage() {
  useRequireAuth();
  const [user, setUser] = useState<{ username: string } | null>(null);

  const {
    appointments,
    totalItems,
    currentPage,
    setCurrentPage,
    stats,
    options,
    filters,
    setFilters,
    handleSuccess,
  } = useDashboard();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <DashboardHeader
          user={user}
          onNew={() => {
            setSelectedApp(null);
            setIsModalOpen(true);
          }}
        />

        <StatsCards stats={stats} />

        <FilterBar
          filters={filters}
          setFilters={setFilters}
          options={options}
        />

        <section className={styles.contentCard}>
          <AppointmentTable
            data={appointments}
            onViewDetail={(app) => {
              setSelectedApp(app);
              setIsModalOpen(true);
            }}
          />
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            pageSize={10}
            onPageChange={setCurrentPage}
          />
        </section>

        <EfficiencyChart />

        {}

        <CreateAppointmentModal
          isOpen={isModalOpen}
          initialData={selectedApp}
          onClose={() => setIsModalOpen(false)}
          onSuccess={(msg) => {
            setIsModalOpen(false);
            handleSuccess(msg);
          }}
        />
      </main>
    </div>
  );
}
