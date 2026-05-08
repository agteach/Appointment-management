import { create } from "zustand";

const getStoredToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem("token");
};

const getStoredUser = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const storedUser = window.localStorage.getItem("user");

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    window.localStorage.removeItem("user");
    return null;
  }
};

const useAuthStore = create((set) => ({
    user: getStoredUser(),
    token: getStoredToken(),

    login: (user, token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        set({
            user,
            token,
        });
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        set({
            user: null,
            token: null,
        });
    },

    loadUser: () => {
        set({
            token: getStoredToken(),
            user: getStoredUser(),
        });
    },
}));

export default useAuthStore;
