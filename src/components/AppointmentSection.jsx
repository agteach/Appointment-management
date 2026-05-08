import AppointmentList from "./AppointmentList";

export default function AppointmentSection({ data, handleEdit, handleDelete }) {
  return (
    <div className="lg:col-span-2">
      <div className="soft-panel rounded-[1.85rem] p-6 sm:p-7">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              Schedule stream
            </p>
            <h2 className="display-font mt-2 text-4xl leading-none text-[var(--text)]">
              Appointments
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              Review upcoming sessions, jump into edits, or clear out finished
              items.
            </p>
          </div>

          <span className="eyebrow self-start sm:self-auto">
            <span className="brand-orb"></span>
            {data.length} total
          </span>
        </div>

        {data.length === 0 ? (
          <div className="rounded-[1.75rem] border border-dashed border-[var(--line-strong)] bg-white/45 px-6 py-16 text-center">
            <p className="display-font text-3xl text-[var(--text)]">
              Nothing booked yet
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--muted)]">
              Create the first appointment from the panel on the left and the
              schedule will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <AppointmentList
              data={data}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
}
