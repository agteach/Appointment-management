import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../api/axios";
import toast from "react-hot-toast";
import useAuthStore from "../store/authStore";
import Navbar from "../components/Navbar";
import DashboardSidebar from "../components/DashboardSidebar";
import AppointmentSection from "../components/AppointmentSection";

const getLocalDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getAppointmentDateKey = (value) => {
  if (!value) {
    return "";
  }

  return String(value).slice(0, 10);
};

const getAppointmentDateTime = (appointment) => {
  const dateKey = getAppointmentDateKey(appointment.date);

  if (!dateKey) {
    return null;
  }

  const time = appointment.time || "00:00";
  return new Date(`${dateKey}T${time}:00`);
};

export default function Dashboard() {
  const queryClient = useQueryClient();
  const logout = useAuthStore((state) => state.logout);

  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    duration: 60,
  });

  const [editingId, setEditingId] = useState(null);
  const handleAuthError = (error) => {
    if (error?.response?.status === 401) {
      logout();
      toast.error("Session expired. Please log in again.");
      return true;
    }

    return false;
  };
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const res = await axios.get("/appointments");
      return res.data;
    },
    retry: false,
  });

  useEffect(() => {
    if (error?.response?.status === 401) {
      logout();
      toast.error("Session expired. Please log in again.");
    }
  }, [error, logout]);

  const createMutation = useMutation({
    mutationFn: async (newData) => {
      const res = await axios.post("/appointments", newData);
      return res.data;
    },

    onSuccess: () => {
      toast.success("Appointment created");

      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });

      resetForm();
    },

    onError: (err) => {
      if (!handleAuthError(err)) {
        toast.error(
          err.response?.data?.message || "Failed to create appointment",
        );
      }
    },
  });
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axios.put(`/appointments/${id}`, data);
      return res.data;
    },

    onSuccess: () => {
      toast.success("Appointment updated");

      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });

      resetForm();
    },

    onError: (err) => {
      if (!handleAuthError(err)) {
        toast.error(
          err.response?.data?.message || "Failed to update appointment",
        );
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`/appointments/${id}`);
    },

    onSuccess: () => {
      toast.success("Appointment deleted");

      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },

    onError: (err) => {
      if (!handleAuthError(err)) {
        toast.error(
          err.response?.data?.message || "Failed to delete appointment",
        );
      }
    },
  });

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const handleEdit = (appointment) => {
    setForm({
      title: appointment.title,
      date: getAppointmentDateKey(appointment.date),
      time: appointment.time,
      duration: appointment.duration || 60,
    });

    setEditingId(appointment._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = (id) => {
    if (confirm("Delete this appointment?")) {
      deleteMutation.mutate(id);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      date: "",
      time: "",
      duration: 60,
    });

    setEditingId(null);
  };

  const today = getLocalDateKey();

  const todayAppointments = data.filter(
    (appointment) => getAppointmentDateKey(appointment.date) === today,
  );

  const upcomingAppointments = data.filter((appointment) => {
    const appointmentDateTime = getAppointmentDateTime(appointment);

    return appointmentDateTime && appointmentDateTime >= new Date();
  });

  if (isLoading) {
    return (
      <div className="page-shell min-h-screen">
        <Navbar />

        <div className="content-layer flex h-[70vh] items-center justify-center px-4">
          <div className="glass-panel rounded-[1.75rem] px-8 py-6 text-lg font-medium text-[var(--muted)]">
            Loading appointments...
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="page-shell min-h-screen">
        <Navbar />

        <div className="content-layer mx-auto max-w-4xl p-6">
          <div className="rounded-[1.6rem] border border-[#e6b3a6] bg-[#fff2ee] p-5 text-[#9f4021] shadow-[0_12px_28px_rgba(159,64,33,0.08)]">
            {error?.response?.data?.message || "Failed to load appointments"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell min-h-screen">
      <Navbar />

      <div className="content-layer mx-auto max-w-7xl px-4 pb-8 pt-6 sm:px-6">
        <div className="mb-8 hidden rounded-[1.9rem] border border-white/40 bg-white/40 px-6 py-7 shadow-[0_16px_34px_rgba(81,60,31,0.08)] backdrop-blur lg:block">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            Daily control
          </p>
          <h1 className="display-font mt-3 text-5xl leading-none text-[var(--text)]">
            Dashboard
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
            Manage your appointments with a clearer rhythm: review what is due,
            create what is next, and edit plans without losing context.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <DashboardSidebar
            data={data}
            upcomingAppointments={upcomingAppointments}
            todayAppointments={todayAppointments}
            editingId={editingId}
            resetForm={resetForm}
            form={form}
            setForm={setForm}
            isSubmitting={isSubmitting}
            createMutation={createMutation}
            updateMutation={updateMutation}
          />

          <AppointmentSection
            data={data}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
