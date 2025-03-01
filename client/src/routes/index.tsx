import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/auth/Login";
import Register from "@/auth/Register";
import DocRegister from "@/auth/DocRegister";
import Profile from "@/pages/Profile";
import HealthTracker from "@/pages/HealthTracker";
import Appointments from "@/pages/Appointments";
import PreventiveHealth from "@/pages/PreventiveHealth";
import Insurance from "@/pages/Insurance";
import Symptoms from "@/pages/Symptoms";
import BMI from "@/pages/BMI";
import Medicine from "@/pages/Medicine";
import ChatCall from "@/pages/chat/VideoChat";
import AiDoctor from "@/pages/AiDoctor";
import Ayushman from "@/pages/Ayushman";
import NotFound from "@/pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/doc-register" element={<DocRegister />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/health-tracker" element={<HealthTracker />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/preventive-health" element={<PreventiveHealth />} />
      <Route path="/insurance" element={<Insurance />} />
      <Route path="/symptoms" element={<Symptoms />} />
      <Route path="/bmi" element={<BMI />} />
      <Route path="/medicine" element={<Medicine />} />
      <Route path="/chat" element={<ChatCall />} />
      <Route path="/ai-doctor" element={<AiDoctor />} />
      <Route path="/ayushman" element={<Ayushman />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes; 