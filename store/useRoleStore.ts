import { create } from "zustand";
import { persist } from "zustand/middleware";

type Role = "viewer" | "admin";

interface RoleState {
    role: Role;
    setRole: (role: Role) => void;
}

export const useRoleStore = create<RoleState>()(
    persist(
        (set) => ({
            role: "viewer", // Default role
            setRole: (role) => set({ role }),
        }),
        {
            name: "finance_role_storage", // Key used in localStorage
        }
    )
);

// A handy helper hook so we don't have to write the selector manually everywhere
export const useIsAdmin = () => {
    return useRoleStore((state) => state.role === "admin");
};