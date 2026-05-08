export default function StatsCards({ total, upcoming, today }) {
  const cards = [
    {
      label: "Total appointments",
      value: total,
      helper: "Everything currently on your board",
      className: "metric-card total",
    },
    {
      label: "Upcoming",
      value: upcoming,
      helper: "Still ahead from right now",
      className: "metric-card upcoming",
    },
    {
      label: "Today",
      value: today,
      helper: "Happening before the day closes",
      className: "metric-card today",
    },
  ];

  return (
    <div className="hidden gap-4 lg:grid lg:grid-cols-1">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`${card.className} soft-panel rounded-[1.75rem] p-6`}
        >
          <p className="stat-kicker">{card.label}</p>
          <h2 className="mt-3 text-4xl font-bold text-[var(--text)]">
            {card.value}
          </h2>
          <p className="mt-3 max-w-[18rem] text-sm leading-6 text-[var(--muted)]">
            {card.helper}
          </p>
        </div>
      ))}
    </div>
  );
}
