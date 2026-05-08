import DashboardForm from "./DashboardForm";

export default function AppointmentFormCard({
  editingId,
  resetForm,
  form,
  setForm,
  isSubmitting,
  createMutation,
  updateMutation,
}) {
  return (
    <div className="soft-panel rounded-[1.85rem] p-6 sm:p-7">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            Planning panel
          </p>
          <h2 className="display-font mt-2 text-3xl leading-none text-[var(--text)]">
            {editingId ? "Edit appointment" : "Create appointment"}
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--muted)]">
            Capture a title, choose a date, and keep the schedule moving with
            minimal friction.
          </p>
        </div>

        {editingId && (
          <button
            onClick={resetForm}
            className="ghost-button px-3 py-2 text-sm font-semibold"
          >
            Cancel
          </button>
        )}
      </div>

      <DashboardForm
        form={form}
        setForm={setForm}
        editingId={editingId}
        isSubmitting={isSubmitting}
        createMutation={createMutation}
        updateMutation={updateMutation}
      />
    </div>
  );
}
