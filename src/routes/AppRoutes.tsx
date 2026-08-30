import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import DashboardLayout from "../components/layout/DashboardLayout";
import Landing from "../pages/Landing";
import NotFound from "../pages/NotFound";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Events from "../pages/student/Events";
import EventDetails from "../pages/student/EventDetails";
import MyRegistrations from "../pages/student/MyRegistrations";
import MyCertificates from "../pages/student/MyCertificates";
import OrganizerDashboard from "../pages/organizer/OrganizerDashboard";
import MyEvents from "../pages/organizer/MyEvents";
import CreateEvent from "../pages/organizer/CreateEvent";
import EventRegistrations from "../pages/organizer/EventRegistrations";
import Attendance from "../pages/organizer/Attendance";
import QRScanner from "../pages/organizer/QRScanner";
import Profile from "../pages/Profile";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute allowedRole="student" />}>
          <Route element={<DashboardLayout />}>
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/my-registrations" element={<MyRegistrations />} />
            <Route path="/my-certificates" element={<MyCertificates />} />
          </Route>
        </Route>

        <Route element={<RoleRoute allowedRole="organizer" />}>
          <Route element={<DashboardLayout />}>
            <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
            <Route path="/organizer/events" element={<MyEvents />} />
            <Route path="/organizer/events/new" element={<CreateEvent />} />
            <Route path="/organizer/events/:id/registrations" element={<EventRegistrations />} />
            <Route path="/organizer/events/:id/attendance" element={<Attendance />} />
            <Route path="/organizer/events/:id/scan" element={<QRScanner />} />
          </Route>
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
