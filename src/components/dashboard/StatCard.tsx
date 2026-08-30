interface StatCardProps {
  label: string;
  value: number;
}

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-surface border border-border rounded-card p-5">
      <p className="text-sm text-text-secondary mb-1">{label}</p>
      <p className="text-3xl font-bold text-text">{value}</p>
    </div>
  );
}
