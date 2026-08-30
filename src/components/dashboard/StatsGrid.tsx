import StatCard from "./StatCard";
import type { OrganizerStats } from "../../services/organizer.service";

export default function StatsGrid({ stats }: { stats: OrganizerStats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <StatCard label="Total Events" value={stats.totalEvents} />
      <StatCard label="Total Registrations" value={stats.totalRegistrations} />
      <StatCard label="Checked In" value={stats.totalCheckedIn} />
    </div>
  );
}
