import StatsCards from "./StatsCards";
import AppointmentFormCard from "./AppointmentFormCard";

export default function DashboardSidebar({
  data,
  upcomingAppointments,
  todayAppointments,
  editingId,
  resetForm,
  form,
  setForm,
  isSubmitting,
  createMutation,
  updateMutation,
}) {
  return (
    <div className="lg:col-span-1 space-y-6">
      <StatsCards
        total={data.length}
        upcoming={upcomingAppointments.length}
        today={todayAppointments.length}
      />

      <AppointmentFormCard
        editingId={editingId}
        resetForm={resetForm}
        form={form}
        setForm={setForm}
        isSubmitting={isSubmitting}
        createMutation={createMutation}
        updateMutation={updateMutation}
      />
    </div>
  );
}
