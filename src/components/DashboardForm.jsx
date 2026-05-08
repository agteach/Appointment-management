import toast from "react-hot-toast";

export default function DashboardForm({
  form,
  setForm,
  editingId,
  isSubmitting,
  createMutation,
  updateMutation,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.date || !form.time) {
      toast.error("Please fill all fields");
      return;
    }

    if (editingId) {
      updateMutation.mutate({
        id: editingId,
        data: form,
      });
    } else {
      createMutation.mutate(form);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block space-y-2">
        <span className="field-label">Appointment title</span>
        <input
          className="field-input"
          placeholder="Discovery call, design review, check-in..."
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="field-label">Date</span>
          <input
            type="date"
            className="field-input"
            value={form.date}
            onChange={(e) =>
              setForm({
                ...form,
                date: e.target.value,
              })
            }
          />
        </label>

        <label className="block space-y-2">
          <span className="field-label">Time</span>
          <input
            type="time"
            className="field-input"
            value={form.time}
            onChange={(e) =>
              setForm({
                ...form,
                time: e.target.value,
              })
            }
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="primary-button w-full py-3.5"
      >
        {isSubmitting
          ? "Saving..."
          : editingId
            ? "Update Appointment"
            : "Create Appointment"}
      </button>

      <p className="text-sm leading-6 text-[var(--muted)]">
        Appointments are protected per user and automatically sorted by date and
        time.
      </p>
    </form>
  );
}
