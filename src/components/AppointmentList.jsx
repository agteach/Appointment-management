export default function AppointmentList({ data, handleEdit, handleDelete }) {
  const formatDate = (value) => {
    if (!value) {
      return "No date";
    }

    return new Date(value).toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDuration = (value) => {
    if (!value) {
      return "60 min";
    }

    return `${value} min`;
  };

  const getStatusClass = (status = "scheduled") => {
    return `status-pill status-${status}`;
  };

  return (
    <div className="space-y-4">
      {data.map((appointment) => (
        <div
          key={appointment._id}
          className="appointment-card rounded-[1.6rem] border border-[var(--line)] bg-white/72 p-5 sm:p-6"
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <div className={getStatusClass(appointment.status)}>
                  {appointment.status || "scheduled"}
                </div>

                <h3 className="text-2xl font-bold text-[var(--text)]">
                  {appointment.title}
                </h3>

                <div className="flex flex-wrap gap-3">
                  <span className="meta-chip">
                    <span className="meta-dot"></span>
                    {formatDate(appointment.date)}
                  </span>

                  <span className="meta-chip">
                    <span className="meta-dot"></span>
                    {appointment.time}
                  </span>

                  <span className="meta-chip">
                    <span className="meta-dot"></span>
                    {formatDuration(appointment.duration)}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleEdit(appointment)}
                  className="secondary-button px-4 py-2.5 text-sm font-semibold"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(appointment._id)}
                  className="rounded-full border border-transparent bg-[var(--surface-dark)] px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black"
                >
                  Delete
                </button>
              </div>
            </div>

            {appointment.description && (
              <p className="max-w-3xl text-sm leading-6 text-[var(--muted)]">
                {appointment.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
