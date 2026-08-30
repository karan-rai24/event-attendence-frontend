import { useAuth } from "../context/AuthContext";
import Spinner from "../components/common/Spinner";

export default function Profile() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Spinner />;

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary">Not logged in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-text mb-6">Profile</h1>
      <div className="bg-surface border border-border rounded-card p-6 space-y-4">
        <div>
          <span className="text-sm font-medium text-text-secondary">Name</span>
          <p className="text-text">{user.name}</p>
        </div>
        <div>
          <span className="text-sm font-medium text-text-secondary">Email</span>
          <p className="text-text">{user.email}</p>
        </div>
        <div>
          <span className="text-sm font-medium text-text-secondary">Phone</span>
          <p className="text-text">{user.phone}</p>
        </div>
        <div>
          <span className="text-sm font-medium text-text-secondary">Role</span>
          <p className="text-text capitalize">{user.role}</p>
        </div>
        <div>
          <span className="text-sm font-medium text-text-secondary">Member since</span>
          <p className="text-text">
            {new Date(user.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
