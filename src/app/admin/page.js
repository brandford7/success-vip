"use client";
import AdminDashboard from "../components/adminDashboard";
import { useAuth } from "@/app/context/authContext";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const { user } = useAuth();

  const router = useRouter();

  if (!user || (user && user.name !== "")) {
    if (user.role !== "admin") {
      router.push("/auth/login");
    }
  }

  return (
    <>
      <AdminDashboard />
    </>
  );
};

export default AdminPage;
