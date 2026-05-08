import { useState } from "react";
import axios from "../api/axios";
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";

export default function Login() {
  const login = useAuthStore((state) => state.login);

  const [isSignup, setIsSignup] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        await axios.post("/auth/signup", form);

        toast.success("Account created successfully");

        setForm((current) => ({
          ...current,
          password: "",
        }));
        setIsSignup(false);

        return;
      }

      const res = await axios.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      login(res.data.user, res.data.token);

      toast.success("Login successful");
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";

      toast.error(message);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="page-shell">
      <div className="auth-grid content-layer">
        <section className="auth-hero glass-panel slide-up rounded-[2rem] p-8 sm:p-10 lg:p-12">
          <div className="flex h-full flex-col justify-between gap-10">
            <div className="space-y-6">
              <div className="eyebrow border-white/20 bg-white/10 text-white/80">
                <span className="brand-orb"></span>
                Intelligent scheduling
              </div>

              <div className="max-w-xl space-y-5">
                <h1 className="display-font text-5xl leading-none sm:text-6xl">
                  Appointments that feel calm, clear, and under control.
                </h1>

                <p className="max-w-lg text-base leading-7 text-white/78 sm:text-lg">
                  Track meetings, protect your time, and keep every booking in
                  one focused workspace built for daily flow.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-white/12 bg-white/10 p-4 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.16em] text-white/58">
                  Secure
                </p>
                <p className="mt-3 text-lg font-medium text-white">
                  Token-based access for every session
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-white/12 bg-white/10 p-4 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.16em] text-white/58">
                  Organized
                </p>
                <p className="mt-3 text-lg font-medium text-white">
                  Today, upcoming, and editable at a glance
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-white/12 bg-white/10 p-4 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.16em] text-white/58">
                  Reliable
                </p>
                <p className="mt-3 text-lg font-medium text-white">
                  Built for fast CRUD and safe session handling
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="auth-form-panel glass-panel slide-up rounded-[2rem] p-6 sm:p-8 lg:p-10">
          <div className="relative z-10 mx-auto flex h-full w-full max-w-md flex-col justify-center">
            <div className="mb-8 space-y-4">
              <div className="eyebrow">
                <span className="brand-orb"></span>
                Welcome back
              </div>

              <div className="space-y-3">
                <h2 className="display-font text-4xl leading-none sm:text-5xl">
                  {isSignup ? "Create your account" : "Sign into your desk"}
                </h2>

                <p className="text-sm leading-6 text-[#5e6d68] sm:text-base">
                  {isSignup
                    ? "Start managing appointments with a clean, single-screen workflow."
                    : "Pick up where you left off and manage the day without friction."}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {isSignup && (
                <label className="block space-y-2">
                  <span className="field-label">Full name</span>
                  <input
                    name="name"
                    className="field-input"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={handleChange}
                  />
                </label>
              )}

              <label className="block space-y-2">
                <span className="field-label">Email</span>
                <input
                  name="email"
                  className="field-input"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </label>

              <label className="block space-y-2">
                <span className="field-label">Password</span>
                <input
                  name="password"
                  type="password"
                  className="field-input"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                />
              </label>

              <button type="submit" className="primary-button w-full py-3.5">
                {isSignup ? "Create Account" : "Login"}
              </button>
            </form>

            <div className="mt-6 rounded-[1.25rem] border border-[var(--line)] bg-white/50 p-4 text-sm text-[var(--muted)]">
              {isSignup ? "Already have an account?" : "Don't have an account?"}

              <button
                onClick={() => setIsSignup(!isSignup)}
                className="ml-2 font-semibold text-[var(--accent)] transition hover:text-[var(--accent-strong)]"
              >
                {isSignup ? "Login" : "Sign up"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
