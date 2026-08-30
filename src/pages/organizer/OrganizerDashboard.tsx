import { useState, useEffect } from "react";
import { getOrganizerStats, type OrganizerStats } from "../../services/organizer.service";
import StatsGrid from "../../components/dashboard/StatsGrid";
import Spinner from "../../components/common/Spinner";

export default function OrganizerDashboard() {
  const [stats, setStats] = useState<OrganizerStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getOrganizerStats()
      .then(setStats)
      .catch(() => setError("Failed to load dashboard stats."))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Spinner />;

  if (error) {
    return (
      <div className="bg-error-bg text-error px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-6">Organizer Dashboard</h1>
      {stats && <StatsGrid stats={stats} />}
    </div>
  );
}
