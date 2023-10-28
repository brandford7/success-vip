
'use client'
import AdminDashboard from "../components/adminDashboard";
import { useAuth } from "@/app/context/authContext";
import {redirect} from 'next/navigation'

const AdminPage = () => {

  const { user }
 =useAuth()
//const isAdmin = user.role === "admin";

 
  if (user  &&  user.name !== "") {
    if (  user.role !== 'admin' ) {
      redirect("/");
    }
  }

  return (
    <>
     
        
        <AdminDashboard />
     
    </>
  );
};

export default AdminPage;
