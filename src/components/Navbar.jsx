import { useState } from "react";
import useAuthStore from "../store/authStore";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const userName = user?.name?.trim() || "User";

  const handleLogout = () => {
    setIsMenuOpen(false);
    logout();
  };

  return (
    <div className="content-layer px-4 pt-4 sm:px-6 sm:pt-6">
      <div className="glass-panel mx-auto max-w-7xl rounded-[1.75rem] px-5 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--accent),#e19a47)] text-lg font-bold text-white shadow-[0_14px_28px_rgba(159,64,33,0.22)]">
              AS
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                Appointment desk
              </p>
              <h1 className="display-font text-3xl leading-none text-[var(--text)]">
                Schedule board
              </h1>
            </div>
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="secondary-button flex h-11 w-11 items-center justify-center sm:hidden"
          >
            <span className="sr-only">
              {isMenuOpen ? "Close menu" : "Open menu"}
            </span>
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-5 rounded-full bg-[var(--text)] transition ${
                  isMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-5 rounded-full bg-[var(--text)] transition ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-5 rounded-full bg-[var(--text)] transition ${
                  isMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>

        <div className="mt-4 hidden flex-col gap-3 sm:flex sm:flex-row sm:items-center sm:justify-end">
          <div className="rounded-[1.1rem] border border-[var(--line)] bg-white/55 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              Signed in
            </p>
            <p className="text-sm font-medium text-[var(--text)]">
              {userName}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="secondary-button px-4 py-3 font-semibold"
          >
            Logout
          </button>
        </div>

        {isMenuOpen && (
          <div className="mt-4 space-y-3 border-t border-[var(--line)] pt-4 sm:hidden">
            <div className="rounded-[1.1rem] border border-[var(--line)] bg-white/55 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                Signed in
              </p>
              <p className="text-sm font-medium text-[var(--text)]">
                {userName}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="secondary-button w-full px-4 py-3 font-semibold"
            >
              Logout
            </button>
          </div>
        )}
        </div>
    </div>
  );
}
